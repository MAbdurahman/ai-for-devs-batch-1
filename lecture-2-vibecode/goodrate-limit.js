/**
 * Production-grade Redis rate limiter middleware.
 * Uses an atomic MULTI sequence to ensure consistency and performance.
 * Optimized for 50k+ req/day with a fixed-window counter.
 * 
 * @param {Object} redis - An active ioredis or node-redis instance.
 */
const rateLimitMiddleware = (redis) => async (req, res, next) => {
    const key = `ratelimit:${req.ip}`;
    const LIMIT = 100;
    const WINDOW_SECONDS = 60;

    try {
        // Atomic increment and TTL set (NX: only set if key doesn't exist)
        const [[err, current]] = await redis.multi()
            .incr(key)
            .expire(key, WINDOW_SECONDS, 'NX')
            .exec();

        if (err) throw err;

        res.set('X-RateLimit-Limit', LIMIT);
        res.set('X-RateLimit-Remaining', Math.max(0, LIMIT - current));

        if (current > LIMIT) {
            return res.status(429).json({
                status: 'fail',
                message: 'Rate limit exceeded. Try again in a minute.'
            });
        }

        next();
    } catch (error) {
        // Log error and fail-open in production to avoid blocking traffic due to Redis issues
        console.error('Rate Limiter Error:', error);
        next();
    }
};

module.exports = rateLimitMiddleware;

/**
 * A robust Sliding Window Rate Limiter implementation.
 * 
 * Features:
 * - Precise windowing using timestamps.
 * - Automatic cleanup of expired entries to prevent memory leaks.
 * - Memory-efficient storage using Maps and Arrays.
 */
class RateLimiter {
    /**
     * @param {number} limit - Maximum number of requests allowed within the window.
     * @param {number} windowMs - The time window in milliseconds.
     */
    constructor(limit, windowMs) {
        this.limit = limit;
        this.windowMs = windowMs;
        this.cache = new Map();
        
        // Periodically clean up fully expired keys to prevent memory growth
        this.cleanupInterval = setInterval(() => this.cleanup(), windowMs * 2);
        // Ensure the interval doesn't keep the process alive in Node.js
        if (this.cleanupInterval.unref) {
            this.cleanupInterval.unref();
        }
    }

    /**
     * Checks if a request for the given key is allowed.
     * @param {string} key - Unique identifier for the client (e.g., IP address or User ID).
     * @returns {boolean} - True if allowed, false if rate-limited.
     */
    isAllowed(key) {
        const now = Date.now();
        const windowStart = now - this.windowMs;

        if (!this.cache.has(key)) {
            this.cache.set(key, [now]);
            return true;
        }

        let timestamps = this.cache.get(key);

        // Filter out timestamps that have fallen outside the sliding window
        timestamps = timestamps.filter(ts => ts > windowStart);

        if (timestamps.length < this.limit) {
            timestamps.push(now);
            this.cache.set(key, timestamps);
            return true;
        }

        // Still update the cache with the filtered timestamps even if rejected
        this.cache.set(key, timestamps);
        return false;
    }

    /**
     * Removes keys from the cache that have no recent activity.
     */
    cleanup() {
        const now = Date.now();
        const windowStart = now - this.windowMs;

        for (const [key, timestamps] of this.cache.entries()) {
            const hasRecentActivity = timestamps.some(ts => ts > windowStart);
            if (!hasRecentActivity) {
                this.cache.delete(key);
            }
        }
    }

    /**
     * Stops the internal cleanup interval.
     */
    destroy() {
        clearInterval(this.cleanupInterval);
    }
}

// --- Example Usage ---
// const limiter = new RateLimiter(5, 1000); // 5 requests per second
//
// for (let i = 0; i < 7; i++) {
//     const allowed = limiter.isAllowed('user-123');
//     console.log(`Request ${i + 1}: ${allowed ? '✅' : '❌'}`);
// }

module.exports = RateLimiter;

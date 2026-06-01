/**
 * Render misconfiguration shim: if Start Command is `node backend/index.js`
 * with Root Directory = `backend`, Node looks here.
 * Preferred Start Command: `npm start` (runs src/index.js).
 */
import '../src/index.js'

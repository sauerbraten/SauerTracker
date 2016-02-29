var _ = require('lodash');

var config = require('../../tracker.json');
var vars = require('../../vars.json');

/**
 *  Replace the last byte in an IP address.
 *  @param {string} ip - The IP address.
 *  @param {string} to - The new last byte.
 *  @returns {string}
 */
export function ipRepLB(ip, to) {
	return ip.replace(/\.[\d\*]+$/, "."+to);
}

/**
 *  Round number to 2 decimals.
 *  @param {number} val
 *  @returns {number}
 */
export function round2(val) {
	return Math.round(val*100)/100;
}

/**
 *  Check whether ip is a valid IP.
 *  @param {string} ip
 *  @returns {boolean}
 */
export function isValidIP(ip) {
	let parts = ip.split(".");
	if (parts.length != 4) return false;
	for (let i = 0; i < 4; i++) {
		let n = Number(parts[i]);
		if (n < 0 || n > 255) return false;
	}
	return true;
}

/**
 *  Check whether port is a valid port number.
 *  @param {number} port
 *  @returns {boolean}
 */
export function isValidPort(port) {
	return port>0 && port<65535;
}

/**
 *  If in debug mode print stack stace and exits. Otherwise print error message.
 *  @param {any} msg
 */
export function error(msg) {
	if (config.debug) {
		console.log("Error:", msg);
		if (typeof msg === "string") throw new Error(msg);
		throw new Error(msg);
	}
	else console.log("Error:", msg);
}

/**
 *  If in debug mode prints msg.
 *  @param {any} msg
 */
export function debug(...msg) {
	if (config.debug) console.log(...msg);
}

/**
 *  If condition is not truthful, if in debug mode; print stack trace and exits, otherwise; print error message.
 *  @param {any} condition
 *  @param {string} msg
 */
export function assert(condition, msg) {
	if (config.debug) throw new Error("Assert failed: "+msg);
	else console.log("Assert failed: "+msg);
}

/**
 *  Extract the clantag from a player name. If no clantag is found, return undefined.
 *  @param {string} name
 */
export function getClan(name) {
	let clan = _.find(vars.clans, clan => (name.indexOf(clan.tag) >= 0));
	return clan&&clan.tag;
}
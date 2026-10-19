/*\
title: $:/folio/nav.js
type: application/javascript
module-type: startup

Keeps the address bar and the current view in step. The whole site is one
page: the view shown is whatever $:/state/folio/view contains, and every
navigation link is an ordinary anchor such as href="#systems" or
href="#systems/logos" (view, then an optional element id to scroll to).
Links therefore work with the back button, middle-click and shared URLs.
\*/
(function(){

"use strict";

exports.name = "folio-nav";
exports.platforms = ["browser"];
exports.after = ["startup"];
exports.before = ["render"];
exports.synchronous = true;

var STATE = "$:/state/folio/view",
	LIST = "$:/folio/Views",
	SITE = "Thomas E. Tuoti";

// "print" is a hidden view that stacks every section for printing and PDF export.
function views() {
	return $tw.wiki.getTiddlerList(LIST).concat(["print"]);
}

function parseHash() {
	var raw = "";
	try {
		raw = decodeURIComponent((window.location.hash || "").replace(/^#\/?/, ""));
	} catch(e) {}
	var parts = raw.split("/");
	return {view: parts[0] || "", anchor: parts[1] || ""};
}

function currentView() {
	var t = $tw.wiki.getTiddler(STATE);
	return (t && t.fields.text) || "home";
}

function setView(view) {
	if(currentView() !== view) {
		$tw.wiki.addTiddler(new $tw.Tiddler({title: STATE, text: view}));
	}
}

function labelFor(view) {
	if(view === "home") {
		return "Portfolio and Systems Architecture";
	}
	if(view === "print") {
		return "Print version";
	}
	var t = $tw.wiki.getTiddler("View/" + view);
	return (t && t.fields["nav-label"]) || view;
}

// Wait until the page widgets have re-rendered the requested view, then
// move focus, scroll and set the document title.
function afterRender(view, anchor, attempts) {
	var main = document.getElementById("main");
	if(!main || main.getAttribute("data-view") !== view) {
		if(attempts < 40) {
			setTimeout(function() { afterRender(view, anchor, attempts + 1); }, 25);
		}
		return;
	}
	document.title = SITE + ": " + labelFor(view);
	var target = anchor ? document.getElementById(anchor) : null;
	if(target) {
		target.scrollIntoView({behavior: "smooth", block: "start"});
		return;
	}
	window.scrollTo({top: 0, behavior: "instant"});
	try {
		main.focus({preventScroll: true});
	} catch(e) {}
}

exports.startup = function() {
	var known = views(),
		initial = parseHash(),
		first = known.indexOf(initial.view) !== -1 ? initial.view : "home";

	$tw.wiki.addTiddler(new $tw.Tiddler({title: STATE, text: first}));

	// Initial load: only scroll to a deep-link anchor, do not steal focus.
	if(first !== "home" || initial.anchor) {
		setTimeout(function() { afterRender(first, initial.anchor, 0); }, 0);
	}

	function onHashChange() {
		var p = parseHash();
		if(p.view === "") {
			p.view = "home";
		}
		// Hashes that are not views (for example the skip link, #main) are left alone.
		if(views().indexOf(p.view) === -1) {
			return;
		}
		setView(p.view);
		afterRender(p.view, p.anchor, 0);
	}

	window.addEventListener("hashchange", onHashChange);
	window.addEventListener("popstate", onHashChange);

	// YouTube refuses to play embedded videos when the page has no web origin
	// (for example index.html opened from disk: "Error 153"). So videos start
	// as a plain card. Over http(s) a click swaps in the player; from a file
	// the card just opens the video on YouTube.
	var root = document.documentElement;
	if(!/^https?:$/.test(window.location.protocol)) {
		root.className += " no-embed";
	}
	document.addEventListener("click", function(event) {
		var link = event.target.closest ? event.target.closest(".video .facade") : null;
		if(!link || !/^https?:$/.test(window.location.protocol) || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey) {
			return;
		}
		event.preventDefault();
		var box = link.parentNode,
			frame = document.createElement("iframe");
		frame.src = "https://www.youtube-nocookie.com/embed/" + encodeURIComponent(box.getAttribute("data-yt")) + "?autoplay=1&rel=0";
		frame.title = box.getAttribute("data-title") || "Video";
		frame.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen";
		frame.referrerPolicy = "strict-origin-when-cross-origin";
		frame.setAttribute("allowfullscreen", "");
		box.innerHTML = "";
		box.appendChild(frame);
		frame.focus();
	});

	// Open every "details" block while printing so the PDF shows the full text.
	var reopened = [];
	window.addEventListener("beforeprint", function() {
		reopened = [];
		Array.prototype.forEach.call(document.querySelectorAll("details.more:not([open])"), function(d) {
			d.setAttribute("open", "");
			reopened.push(d);
		});
	});
	window.addEventListener("afterprint", function() {
		reopened.forEach(function(d) { d.removeAttribute("open"); });
		reopened = [];
	});
};

})();

function clickToAddress(t) {
    "use strict";
    var e = this;
    if (null !== document.getElementById("cc_c2a")) throw "Already initiated";
    if (void 0 === e || void 0 === e.preset) throw 'Incorrect way to initialize this code. use "new ClickToAddress(config);"';
    e.preset(t),
        (e.gfxModeTools = c2a_gfx_modes["mode" + e.gfxMode]),
        e.gfxModeTools.addHtml(e),
        (e.searchObj = document.getElementById("cc_c2a")),
        (e.resultList = e.searchObj.getElementsByClassName("c2a_results")[0]),
        (e.errorObj = e.searchObj.getElementsByClassName("c2a_error")[0]),
        e.getAvailableCountries(function () {
            (e.serviceReady = 1), e.setCountryChange();
            var t = function (t, e) {
                    for (var i = 0; i < e.length; i++) if (e[i].code == t) return !0;
                    return !1;
                },
                i = null;
            if (!e.validCountries.length) throw "Incorrect country configuration.";
            (i = e.validCountries[0].code), t(e.defaultCountry, e.validCountries) && (i = e.defaultCountry), e.getIpLocation && "" !== e.ipLocation && t(e.ipLocation, e.validCountries) && (i = e.ipLocation), e.selectCountry(i);
        }),
        e.searchObj.getElementsByClassName("cc-history").length && e.setHistoryActions(),
        ccEvent(e.searchObj, "mouseover", function () {
            e.hover = !0;
        }),
        ccEvent(e.searchObj, "mouseout", function () {
            e.hover = !1;
        }),
        ccEvent(document, "click", function () {
            e.hide();
        }),
        ccEvent(window, "scroll", function () {
            e.visible &&
                e.focused &&
                setTimeout(function () {
                    e.gfxModeTools.reposition(e, e.activeInput);
                }, 100);
        }),
        ccEvent(window, "resize", function () {
            e.visible &&
                setTimeout(function () {
                    e.gfxModeTools.reposition(e, e.activeInput);
                }, 100);
        }),
        ccEvent(e.resultList, "scroll", function () {
            var t = parseInt(this.scrollTop),
                i = parseInt(window.getComputedStyle(this, null).getPropertyValue("height"));
            1 != e.searchStatus.inCountryMode && 0 !== parseInt(this.scrollHeight) && t + i >= parseInt(this.scrollHeight) && e.showResultsExtra();
        }),
        e.getStyleSheet(),
        e.transliterate && e.addTransl(),
        e.debug && e.start_debug(),
        "xxxxx-xxxxx-xxxxx-xxxxx" == e.key && e.info("pre-trial"),
        void 0 !== t.dom && e.attach(t.dom);
}
function ccEvent(t, e, i) {
    t.addEventListener(e, i);
}
function ccData(t, e, i) {
    if (void 0 !== t && void 0 !== e) return void 0 !== i ? (t.setAttribute("data-" + e, JSON.stringify({ data: i })), !0) : JSON.parse(t.getAttribute("data-" + e)).data;
}
function removeDiacritics(t) {
    for (var e = defaultDiacriticsRemovalMap, i = 0; i < e.length; i++) t = t.replace(e[i].letters, e[i].base);
    return t.toLowerCase();
}
function binaryIndexOf(t, e) {
    "use strict";
    for (var i, s, n = 0, a = t.length - 1; n <= a; )
        if (((i = ((n + a) / 2) | 0), (s = t[i]), s.sequence < e)) n = i + 1;
        else {
            if (!(s.sequence > e)) return i;
            a = i - 1;
        }
    return ~a;
}
function getCountryCode(t, e, i) {
    switch (i) {
        case "iso_3":
            for (var s = 0; s < t.validCountries.length; s++) {
                var n = t.validCountries[s];
                if (n.iso_3166_1_alpha_3 == e) return n.code;
            }
            break;
        case "iso_2":
            for (var s = 0; s < t.validCountries.length; s++) {
                var n = t.validCountries[s];
                if (n.iso_3166_1_alpha_2 == e) return n.code;
            }
    }
    return !1;
}
function inputErrorRemove(t) {
    t.removeClass("error"), t.find("p.error").remove();
}
function inputError(t, e) {
    t.addClass("error"), t.find("p.error").remove(), t.append('<p class="error">' + e + "</p>");
}
function alertModal(t, e) {
    $.modalwindow({ target: "#alertModal" }), $("#alertModal .modal-header").html("<h3>" + t + "</h3>"), $("#alertModal .modal-body").html("<p>" + e + "</p>");
}
function validEmail(t) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(t.toLowerCase());
}
function validDate(t) {
    if (!/^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/.test(t)) return !1;
    var e = t.split("/"),
        t = Date.parse(e[2] + "-" + e[1] + "-" + e[0]);
    return !isNaN(t);
}
function getAddress(t) {
    var t = t.replace(" ", "");
    if (!t) return !1;
    var e = null,
        i = "https://api.getAddress.io/find/" + t + "?api-key=R2jWXHJYm0OY6kyxhFSQLg11495&format=true";
    return (
        $.ajax({
            url: i,
            type: "get",
            dataType: "json",
            async: !1,
            success: function (t) {
                e = t;
            },
        }),
        e
    );
}
if (
    ((function (t) {
        "use strict";
        if ("function" == typeof define && define.amd) define(["jquery", "moment"], t);
        else if ("object" == typeof exports) module.exports = t(require("jquery"), require("moment"));
        else {
            if ("undefined" == typeof jQuery) throw "bootstrap-datetimepicker requires jQuery to be loaded first";
            if ("undefined" == typeof moment) throw "bootstrap-datetimepicker requires Moment.js to be loaded first";
            t(jQuery, moment);
        }
    })(function (t, e) {
        "use strict";
        if (!e) throw new Error("bootstrap-datetimepicker requires Moment.js to be loaded first");
        var i = function (i, s) {
            var n,
                a,
                o,
                r,
                l,
                c,
                h,
                d = {},
                u = !0,
                p = !1,
                f = !1,
                m = 0,
                g = [
                    { clsName: "days", navFnc: "M", navStep: 1 },
                    { clsName: "months", navFnc: "y", navStep: 1 },
                    { clsName: "years", navFnc: "y", navStep: 10 },
                    { clsName: "decades", navFnc: "y", navStep: 100 },
                ],
                v = ["days", "months", "years", "decades"],
                y = ["top", "bottom", "auto"],
                b = ["left", "right", "auto"],
                w = ["default", "top", "bottom"],
                C = {
                    up: 38,
                    38: "up",
                    down: 40,
                    40: "down",
                    left: 37,
                    37: "left",
                    right: 39,
                    39: "right",
                    tab: 9,
                    9: "tab",
                    escape: 27,
                    27: "escape",
                    enter: 13,
                    13: "enter",
                    pageUp: 33,
                    33: "pageUp",
                    pageDown: 34,
                    34: "pageDown",
                    shift: 16,
                    16: "shift",
                    control: 17,
                    17: "control",
                    space: 32,
                    32: "space",
                    t: 84,
                    84: "t",
                    delete: 46,
                    46: "delete",
                },
                _ = {},
                E = function () {
                    return void 0 !== e.tz && void 0 !== s.timeZone && null !== s.timeZone && "" !== s.timeZone;
                },
                $ = function (t) {
                    var i;
                    return (i = void 0 === t || null === t ? e() : e.isDate(t) || e.isMoment(t) ? e(t) : E() ? e.tz(t, c, s.useStrict, s.timeZone) : e(t, c, s.useStrict)), E() && i.tz(s.timeZone), i;
                },
                x = function (t) {
                    if ("string" != typeof t || t.length > 1) throw new TypeError("isEnabled expects a single character string parameter");
                    switch (t) {
                        case "y":
                            return -1 !== l.indexOf("Y");
                        case "M":
                            return -1 !== l.indexOf("M");
                        case "d":
                            return -1 !== l.toLowerCase().indexOf("d");
                        case "h":
                        case "H":
                            return -1 !== l.toLowerCase().indexOf("h");
                        case "m":
                            return -1 !== l.indexOf("m");
                        case "s":
                            return -1 !== l.indexOf("s");
                        default:
                            return !1;
                    }
                },
                k = function () {
                    return x("h") || x("m") || x("s");
                },
                T = function () {
                    return x("y") || x("M") || x("d");
                },
                D = function () {
                    var e = t("<thead>").append(
                            t("<tr>")
                                .append(t("<th>").addClass("prev").attr("data-action", "previous").append(t("<span>").addClass(s.icons.previous)))
                                .append(
                                    t("<th>")
                                        .addClass("picker-switch")
                                        .attr("data-action", "pickerSwitch")
                                        .attr("colspan", s.calendarWeeks ? "6" : "5")
                                )
                                .append(t("<th>").addClass("next").attr("data-action", "next").append(t("<span>").addClass(s.icons.next)))
                        ),
                        i = t("<tbody>").append(t("<tr>").append(t("<td>").attr("colspan", s.calendarWeeks ? "8" : "7")));
                    return [
                        t("<div>")
                            .addClass("datepicker-days")
                            .append(t("<table>").addClass("table-condensed").append(e).append(t("<tbody>"))),
                        t("<div>").addClass("datepicker-months").append(t("<table>").addClass("table-condensed").append(e.clone()).append(i.clone())),
                        t("<div>").addClass("datepicker-years").append(t("<table>").addClass("table-condensed").append(e.clone()).append(i.clone())),
                        t("<div>").addClass("datepicker-decades").append(t("<table>").addClass("table-condensed").append(e.clone()).append(i.clone())),
                    ];
                },
                A = function () {
                    var e = t("<tr>"),
                        i = t("<tr>"),
                        n = t("<tr>");
                    return (
                        x("h") &&
                            (e.append(t("<td>").append(t("<a>").attr({ href: "#", tabindex: "-1", title: s.tooltips.incrementHour }).addClass("btn").attr("data-action", "incrementHours").append(t("<span>").addClass(s.icons.up)))),
                            i.append(t("<td>").append(t("<span>").addClass("timepicker-hour").attr({ "data-time-component": "hours", title: s.tooltips.pickHour }).attr("data-action", "showHours"))),
                            n.append(t("<td>").append(t("<a>").attr({ href: "#", tabindex: "-1", title: s.tooltips.decrementHour }).addClass("btn").attr("data-action", "decrementHours").append(t("<span>").addClass(s.icons.down))))),
                        x("m") &&
                            (x("h") && (e.append(t("<td>").addClass("separator")), i.append(t("<td>").addClass("separator").html(":")), n.append(t("<td>").addClass("separator"))),
                            e.append(t("<td>").append(t("<a>").attr({ href: "#", tabindex: "-1", title: s.tooltips.incrementMinute }).addClass("btn").attr("data-action", "incrementMinutes").append(t("<span>").addClass(s.icons.up)))),
                            i.append(t("<td>").append(t("<span>").addClass("timepicker-minute").attr({ "data-time-component": "minutes", title: s.tooltips.pickMinute }).attr("data-action", "showMinutes"))),
                            n.append(t("<td>").append(t("<a>").attr({ href: "#", tabindex: "-1", title: s.tooltips.decrementMinute }).addClass("btn").attr("data-action", "decrementMinutes").append(t("<span>").addClass(s.icons.down))))),
                        x("s") &&
                            (x("m") && (e.append(t("<td>").addClass("separator")), i.append(t("<td>").addClass("separator").html(":")), n.append(t("<td>").addClass("separator"))),
                            e.append(t("<td>").append(t("<a>").attr({ href: "#", tabindex: "-1", title: s.tooltips.incrementSecond }).addClass("btn").attr("data-action", "incrementSeconds").append(t("<span>").addClass(s.icons.up)))),
                            i.append(t("<td>").append(t("<span>").addClass("timepicker-second").attr({ "data-time-component": "seconds", title: s.tooltips.pickSecond }).attr("data-action", "showSeconds"))),
                            n.append(t("<td>").append(t("<a>").attr({ href: "#", tabindex: "-1", title: s.tooltips.decrementSecond }).addClass("btn").attr("data-action", "decrementSeconds").append(t("<span>").addClass(s.icons.down))))),
                        r ||
                            (e.append(t("<td>").addClass("separator")),
                            i.append(t("<td>").append(t("<button>").addClass("btn btn-primary").attr({ "data-action": "togglePeriod", tabindex: "-1", title: s.tooltips.togglePeriod }))),
                            n.append(t("<td>").addClass("separator"))),
                        t("<div>")
                            .addClass("timepicker-picker")
                            .append(t("<table>").addClass("table-condensed").append([e, i, n]))
                    );
                },
                S = function () {
                    var e = t("<div>").addClass("timepicker-hours").append(t("<table>").addClass("table-condensed")),
                        i = t("<div>").addClass("timepicker-minutes").append(t("<table>").addClass("table-condensed")),
                        s = t("<div>").addClass("timepicker-seconds").append(t("<table>").addClass("table-condensed")),
                        n = [A()];
                    return x("h") && n.push(e), x("m") && n.push(i), x("s") && n.push(s), n;
                },
                O = function () {
                    var e = [];
                    return (
                        s.showTodayButton && e.push(t("<td>").append(t("<a>").attr({ "data-action": "today", title: s.tooltips.today }).append(t("<span>").addClass(s.icons.today)))),
                        !s.sideBySide && T() && k() && e.push(t("<td>").append(t("<a>").attr({ "data-action": "togglePicker", title: s.tooltips.selectTime }).append(t("<span>").addClass(s.icons.time)))),
                        s.showClear && e.push(t("<td>").append(t("<a>").attr({ "data-action": "clear", title: s.tooltips.clear }).append(t("<span>").addClass(s.icons.clear)))),
                        s.showClose && e.push(t("<td>").append(t("<a>").attr({ "data-action": "close", title: s.tooltips.close }).append(t("<span>").addClass(s.icons.close)))),
                        t("<table>")
                            .addClass("table-condensed")
                            .append(t("<tbody>").append(t("<tr>").append(e)))
                    );
                },
                I = function () {
                    var e = t("<div>").addClass("bootstrap-datetimepicker-widget dropdown-menu"),
                        i = t("<div>").addClass("datepicker").append(D()),
                        n = t("<div>").addClass("timepicker").append(S()),
                        a = t("<ul>").addClass("list-unstyled"),
                        o = t("<li>")
                            .addClass("picker-switch" + (s.collapse ? " accordion-toggle" : ""))
                            .append(O());
                    return (
                        s.inline && e.removeClass("dropdown-menu"),
                        r && e.addClass("usetwentyfour"),
                        x("s") && !r && e.addClass("wider"),
                        s.sideBySide && T() && k()
                            ? (e.addClass("timepicker-sbs"),
                              "top" === s.toolbarPlacement && e.append(o),
                              e.append(t("<div>").addClass("row").append(i.addClass("col-md-6")).append(n.addClass("col-md-6"))),
                              "bottom" === s.toolbarPlacement && e.append(o),
                              e)
                            : ("top" === s.toolbarPlacement && a.append(o),
                              T() &&
                                  a.append(
                                      t("<li>")
                                          .addClass(s.collapse && k() ? "collapse in" : "")
                                          .append(i)
                                  ),
                              "default" === s.toolbarPlacement && a.append(o),
                              k() &&
                                  a.append(
                                      t("<li>")
                                          .addClass(s.collapse && T() ? "collapse" : "")
                                          .append(n)
                                  ),
                              "bottom" === s.toolbarPlacement && a.append(o),
                              e.append(a))
                    );
                },
                P = function () {
                    var e,
                        n = (p || i).position(),
                        a = (p || i).offset(),
                        o = s.widgetPositioning.vertical,
                        r = s.widgetPositioning.horizontal;
                    if (s.widgetParent) e = s.widgetParent.append(f);
                    else if (i.is("input")) e = i.after(f).parent();
                    else {
                        if (s.inline) return void (e = i.append(f));
                        (e = i), i.children().first().after(f);
                    }
                    if (
                        ("auto" === o && (o = a.top + 1.5 * f.height() >= t(window).height() + t(window).scrollTop() && f.height() + i.outerHeight() < a.top ? "top" : "bottom"),
                        "auto" === r && (r = e.width() < a.left + f.outerWidth() / 2 && a.left + f.outerWidth() > t(window).width() ? "right" : "left"),
                        "top" === o ? f.addClass("top").removeClass("bottom") : f.addClass("bottom").removeClass("top"),
                        "right" === r ? f.addClass("pull-right") : f.removeClass("pull-right"),
                        "static" === e.css("position") &&
                            (e = e
                                .parents()
                                .filter(function () {
                                    return "static" !== t(this).css("position");
                                })
                                .first()),
                        0 === e.length)
                    )
                        throw new Error("datetimepicker component should be placed within a non-static positioned container");
                    f.css({
                        top: "top" === o ? "auto" : n.top + i.outerHeight(),
                        bottom: "top" === o ? e.outerHeight() - (e === i ? 0 : n.top) : "auto",
                        left: "left" === r ? (e === i ? 0 : n.left) : "auto",
                        right: "left" === r ? "auto" : e.outerWidth() - i.outerWidth() - (e === i ? 0 : n.left),
                    });
                },
                F = function (t) {
                    ("dp.change" !== t.type || t.date || t.oldDate) && i.trigger(t);
                },
                M = function (t) {
                    "y" === t && (t = "YYYY"), F({ type: "dp.update", change: t, viewDate: a.clone() });
                },
                B = function (t) {
                    f &&
                        (t && (h = Math.max(m, Math.min(3, h + t))),
                        f
                            .find(".datepicker > div")
                            .hide()
                            .filter(".datepicker-" + g[h].clsName)
                            .show());
                },
                N = function () {
                    var e = t("<tr>"),
                        i = a.clone().startOf("w").startOf("d");
                    for (!0 === s.calendarWeeks && e.append(t("<th>").addClass("cw").text("#")); i.isBefore(a.clone().endOf("w")); ) e.append(t("<th>").addClass("dow").text(i.format("dd"))), i.add(1, "d");
                    f.find(".datepicker-days thead").append(e);
                },
                H = function (t) {
                    return !0 === s.disabledDates[t.format("YYYY-MM-DD")];
                },
                j = function (t) {
                    return !0 === s.enabledDates[t.format("YYYY-MM-DD")];
                },
                L = function (t) {
                    return !0 === s.disabledHours[t.format("H")];
                },
                z = function (t) {
                    return !0 === s.enabledHours[t.format("H")];
                },
                R = function (e, i) {
                    if (!e.isValid()) return !1;
                    if (s.disabledDates && "d" === i && H(e)) return !1;
                    if (s.enabledDates && "d" === i && !j(e)) return !1;
                    if (s.minDate && e.isBefore(s.minDate, i)) return !1;
                    if (s.maxDate && e.isAfter(s.maxDate, i)) return !1;
                    if (s.daysOfWeekDisabled && "d" === i && -1 !== s.daysOfWeekDisabled.indexOf(e.day())) return !1;
                    if (s.disabledHours && ("h" === i || "m" === i || "s" === i) && L(e)) return !1;
                    if (s.enabledHours && ("h" === i || "m" === i || "s" === i) && !z(e)) return !1;
                    if (s.disabledTimeIntervals && ("h" === i || "m" === i || "s" === i)) {
                        var n = !1;
                        if (
                            (t.each(s.disabledTimeIntervals, function () {
                                if (e.isBetween(this[0], this[1])) return (n = !0), !1;
                            }),
                            n)
                        )
                            return !1;
                    }
                    return !0;
                },
                q = function () {
                    for (var e = [], i = a.clone().startOf("y").startOf("d"); i.isSame(a, "y"); ) e.push(t("<span>").attr("data-action", "selectMonth").addClass("month").text(i.format("MMM"))), i.add(1, "M");
                    f.find(".datepicker-months td").empty().append(e);
                },
                W = function () {
                    var e = f.find(".datepicker-months"),
                        i = e.find("th"),
                        o = e.find("tbody").find("span");
                    i.eq(0).find("span").attr("title", s.tooltips.prevYear),
                        i.eq(1).attr("title", s.tooltips.selectYear),
                        i.eq(2).find("span").attr("title", s.tooltips.nextYear),
                        e.find(".disabled").removeClass("disabled"),
                        R(a.clone().subtract(1, "y"), "y") || i.eq(0).addClass("disabled"),
                        i.eq(1).text(a.year()),
                        R(a.clone().add(1, "y"), "y") || i.eq(2).addClass("disabled"),
                        o.removeClass("active"),
                        n.isSame(a, "y") && !u && o.eq(n.month()).addClass("active"),
                        o.each(function (e) {
                            R(a.clone().month(e), "M") || t(this).addClass("disabled");
                        });
                },
                Y = function () {
                    var t = f.find(".datepicker-years"),
                        e = t.find("th"),
                        i = a.clone().subtract(5, "y"),
                        o = a.clone().add(6, "y"),
                        r = "";
                    for (
                        e.eq(0).find("span").attr("title", s.tooltips.prevDecade),
                            e.eq(1).attr("title", s.tooltips.selectDecade),
                            e.eq(2).find("span").attr("title", s.tooltips.nextDecade),
                            t.find(".disabled").removeClass("disabled"),
                            s.minDate && s.minDate.isAfter(i, "y") && e.eq(0).addClass("disabled"),
                            e.eq(1).text(i.year() + "-" + o.year()),
                            s.maxDate && s.maxDate.isBefore(o, "y") && e.eq(2).addClass("disabled");
                        !i.isAfter(o, "y");

                    )
                        (r += '<span data-action="selectYear" class="year' + (i.isSame(n, "y") && !u ? " active" : "") + (R(i, "y") ? "" : " disabled") + '">' + i.year() + "</span>"), i.add(1, "y");
                    t.find("td").html(r);
                },
                V = function () {
                    var t,
                        i = f.find(".datepicker-decades"),
                        o = i.find("th"),
                        r = e({ y: a.year() - (a.year() % 100) - 1 }),
                        l = r.clone().add(100, "y"),
                        c = r.clone(),
                        h = !1,
                        d = !1,
                        u = "";
                    for (
                        o.eq(0).find("span").attr("title", s.tooltips.prevCentury),
                            o.eq(2).find("span").attr("title", s.tooltips.nextCentury),
                            i.find(".disabled").removeClass("disabled"),
                            (r.isSame(e({ y: 1900 })) || (s.minDate && s.minDate.isAfter(r, "y"))) && o.eq(0).addClass("disabled"),
                            o.eq(1).text(r.year() + "-" + l.year()),
                            (r.isSame(e({ y: 2e3 })) || (s.maxDate && s.maxDate.isBefore(l, "y"))) && o.eq(2).addClass("disabled");
                        !r.isAfter(l, "y");

                    )
                        (t = r.year() + 12),
                            (h = s.minDate && s.minDate.isAfter(r, "y") && s.minDate.year() <= t),
                            (d = s.maxDate && s.maxDate.isAfter(r, "y") && s.maxDate.year() <= t),
                            (u +=
                                '<span data-action="selectDecade" class="decade' +
                                (n.isAfter(r) && n.year() <= t ? " active" : "") +
                                (R(r, "y") || h || d ? "" : " disabled") +
                                '" data-selection="' +
                                (r.year() + 6) +
                                '">' +
                                (r.year() + 1) +
                                " - " +
                                (r.year() + 12) +
                                "</span>"),
                            r.add(12, "y");
                    (u += "<span></span><span></span><span></span>"), i.find("td").html(u), o.eq(1).text(c.year() + 1 + "-" + r.year());
                },
                U = function () {
                    var e,
                        i,
                        o,
                        r = f.find(".datepicker-days"),
                        l = r.find("th"),
                        c = [],
                        h = [];
                    if (T()) {
                        for (
                            l.eq(0).find("span").attr("title", s.tooltips.prevMonth),
                                l.eq(1).attr("title", s.tooltips.selectMonth),
                                l.eq(2).find("span").attr("title", s.tooltips.nextMonth),
                                r.find(".disabled").removeClass("disabled"),
                                l.eq(1).text(a.format(s.dayViewHeaderFormat)),
                                R(a.clone().subtract(1, "M"), "M") || l.eq(0).addClass("disabled"),
                                R(a.clone().add(1, "M"), "M") || l.eq(2).addClass("disabled"),
                                e = a.clone().startOf("M").startOf("w").startOf("d"),
                                o = 0;
                            o < 42;
                            o++
                        )
                            0 === e.weekday() && ((i = t("<tr>")), s.calendarWeeks && i.append('<td class="cw">' + e.week() + "</td>"), c.push(i)),
                                (h = ["day"]),
                                e.isBefore(a, "M") && h.push("old"),
                                e.isAfter(a, "M") && h.push("new"),
                                e.isSame(n, "d") && !u && h.push("active"),
                                R(e, "d") || h.push("disabled"),
                                e.isSame($(), "d") && h.push("today"),
                                (0 !== e.day() && 6 !== e.day()) || h.push("weekend"),
                                F({ type: "dp.classify", date: e, classNames: h }),
                                i.append('<td data-action="selectDay" data-day="' + e.format("L") + '" class="' + h.join(" ") + '">' + e.date() + "</td>"),
                                e.add(1, "d");
                        r.find("tbody").empty().append(c), W(), Y(), V();
                    }
                },
                J = function () {
                    var e = f.find(".timepicker-hours table"),
                        i = a.clone().startOf("d"),
                        s = [],
                        n = t("<tr>");
                    for (a.hour() > 11 && !r && i.hour(12); i.isSame(a, "d") && (r || (a.hour() < 12 && i.hour() < 12) || a.hour() > 11); )
                        i.hour() % 4 == 0 && ((n = t("<tr>")), s.push(n)), n.append('<td data-action="selectHour" class="hour' + (R(i, "h") ? "" : " disabled") + '">' + i.format(r ? "HH" : "hh") + "</td>"), i.add(1, "h");
                    e.empty().append(s);
                },
                Q = function () {
                    for (var e = f.find(".timepicker-minutes table"), i = a.clone().startOf("h"), n = [], o = t("<tr>"), r = 1 === s.stepping ? 5 : s.stepping; a.isSame(i, "h"); )
                        i.minute() % (4 * r) == 0 && ((o = t("<tr>")), n.push(o)), o.append('<td data-action="selectMinute" class="minute' + (R(i, "m") ? "" : " disabled") + '">' + i.format("mm") + "</td>"), i.add(r, "m");
                    e.empty().append(n);
                },
                Z = function () {
                    for (var e = f.find(".timepicker-seconds table"), i = a.clone().startOf("m"), s = [], n = t("<tr>"); a.isSame(i, "m"); )
                        i.second() % 20 == 0 && ((n = t("<tr>")), s.push(n)), n.append('<td data-action="selectSecond" class="second' + (R(i, "s") ? "" : " disabled") + '">' + i.format("ss") + "</td>"), i.add(5, "s");
                    e.empty().append(s);
                },
                K = function () {
                    var t,
                        e,
                        i = f.find(".timepicker span[data-time-component]");
                    r || ((t = f.find(".timepicker [data-action=togglePeriod]")), (e = n.clone().add(n.hours() >= 12 ? -12 : 12, "h")), t.text(n.format("A")), R(e, "h") ? t.removeClass("disabled") : t.addClass("disabled")),
                        i.filter("[data-time-component=hours]").text(n.format(r ? "HH" : "hh")),
                        i.filter("[data-time-component=minutes]").text(n.format("mm")),
                        i.filter("[data-time-component=seconds]").text(n.format("ss")),
                        J(),
                        Q(),
                        Z();
                },
                G = function () {
                    f && (U(), K());
                },
                X = function (t) {
                    var e = u ? null : n;
                    if (!t) return (u = !0), o.val(""), i.data("date", ""), F({ type: "dp.change", date: !1, oldDate: e }), void G();
                    if (((t = t.clone().locale(s.locale)), E() && t.tz(s.timeZone), 1 !== s.stepping))
                        for (t.minutes(Math.round(t.minutes() / s.stepping) * s.stepping).seconds(0); s.minDate && t.isBefore(s.minDate); ) t.add(s.stepping, "minutes");
                    R(t)
                        ? ((n = t), (a = n.clone()), o.val(n.format(l)), i.data("date", n.format(l)), (u = !1), G(), F({ type: "dp.change", date: n.clone(), oldDate: e }))
                        : (s.keepInvalid ? F({ type: "dp.change", date: t, oldDate: e }) : o.val(u ? "" : n.format(l)), F({ type: "dp.error", date: t, oldDate: e }));
                },
                tt = function () {
                    var e = !1;
                    return f
                        ? (f.find(".collapse").each(function () {
                              var i = t(this).data("collapse");
                              return !i || !i.transitioning || ((e = !0), !1);
                          }),
                          e
                              ? d
                              : (p && p.hasClass("btn") && p.toggleClass("active"),
                                f.hide(),
                                t(window).off("resize", P),
                                f.off("click", "[data-action]"),
                                f.off("mousedown", !1),
                                f.remove(),
                                (f = !1),
                                F({ type: "dp.hide", date: n.clone() }),
                                o.blur(),
                                (a = n.clone()),
                                d))
                        : d;
                },
                et = function () {
                    X(null);
                },
                it = function (t) {
                    return void 0 === s.parseInputDate ? (!e.isMoment(t) || t instanceof Date) && (t = $(t)) : (t = s.parseInputDate(t)), t;
                },
                st = {
                    next: function () {
                        var t = g[h].navFnc;
                        a.add(g[h].navStep, t), U(), M(t);
                    },
                    previous: function () {
                        var t = g[h].navFnc;
                        a.subtract(g[h].navStep, t), U(), M(t);
                    },
                    pickerSwitch: function () {
                        B(1);
                    },
                    selectMonth: function (e) {
                        var i = t(e.target).closest("tbody").find("span").index(t(e.target));
                        a.month(i), h === m ? (X(n.clone().year(a.year()).month(a.month())), s.inline || tt()) : (B(-1), U()), M("M");
                    },
                    selectYear: function (e) {
                        var i = parseInt(t(e.target).text(), 10) || 0;
                        a.year(i), h === m ? (X(n.clone().year(a.year())), s.inline || tt()) : (B(-1), U()), M("YYYY");
                    },
                    selectDecade: function (e) {
                        var i = parseInt(t(e.target).data("selection"), 10) || 0;
                        a.year(i), h === m ? (X(n.clone().year(a.year())), s.inline || tt()) : (B(-1), U()), M("YYYY");
                    },
                    selectDay: function (e) {
                        var i = a.clone();
                        t(e.target).is(".old") && i.subtract(1, "M"), t(e.target).is(".new") && i.add(1, "M"), X(i.date(parseInt(t(e.target).text(), 10))), k() || s.keepOpen || s.inline || tt();
                    },
                    incrementHours: function () {
                        var t = n.clone().add(1, "h");
                        R(t, "h") && X(t);
                    },
                    incrementMinutes: function () {
                        var t = n.clone().add(s.stepping, "m");
                        R(t, "m") && X(t);
                    },
                    incrementSeconds: function () {
                        var t = n.clone().add(1, "s");
                        R(t, "s") && X(t);
                    },
                    decrementHours: function () {
                        var t = n.clone().subtract(1, "h");
                        R(t, "h") && X(t);
                    },
                    decrementMinutes: function () {
                        var t = n.clone().subtract(s.stepping, "m");
                        R(t, "m") && X(t);
                    },
                    decrementSeconds: function () {
                        var t = n.clone().subtract(1, "s");
                        R(t, "s") && X(t);
                    },
                    togglePeriod: function () {
                        X(n.clone().add(n.hours() >= 12 ? -12 : 12, "h"));
                    },
                    togglePicker: function (e) {
                        var i,
                            n = t(e.target),
                            a = n.closest("ul"),
                            o = a.find(".in"),
                            r = a.find(".collapse:not(.in)");
                        if (o && o.length) {
                            if ((i = o.data("collapse")) && i.transitioning) return;
                            o.removeClass("in"), r.addClass("in"), n.is("span") ? (n.toggleClass(s.icons.time), n.toggleClass(s.icons.date)) : (n.find("span").toggleClass(s.icons.time), n.find("span").toggleClass(s.icons.date));
                        }
                    },
                    showPicker: function () {
                        f.find(".timepicker > div:not(.timepicker-picker)").hide(), f.find(".timepicker .timepicker-picker").show();
                    },
                    showHours: function () {
                        f.find(".timepicker .timepicker-picker").hide(), f.find(".timepicker .timepicker-hours").show();
                    },
                    showMinutes: function () {
                        f.find(".timepicker .timepicker-picker").hide(), f.find(".timepicker .timepicker-minutes").show();
                    },
                    showSeconds: function () {
                        f.find(".timepicker .timepicker-picker").hide(), f.find(".timepicker .timepicker-seconds").show();
                    },
                    selectHour: function (e) {
                        var i = parseInt(t(e.target).text(), 10);
                        r || (n.hours() >= 12 ? 12 !== i && (i += 12) : 12 === i && (i = 0)), X(n.clone().hours(i)), st.showPicker.call(d);
                    },
                    selectMinute: function (e) {
                        X(n.clone().minutes(parseInt(t(e.target).text(), 10))), st.showPicker.call(d);
                    },
                    selectSecond: function (e) {
                        X(n.clone().seconds(parseInt(t(e.target).text(), 10))), st.showPicker.call(d);
                    },
                    clear: et,
                    today: function () {
                        var t = $();
                        R(t, "d") && X(t);
                    },
                    close: tt,
                },
                nt = function (e) {
                    return !t(e.currentTarget).is(".disabled") && (st[t(e.currentTarget).data("action")].apply(d, arguments), !1);
                },
                at = function () {
                    var e,
                        i = {
                            year: function (t) {
                                return t.month(0).date(1).hours(0).seconds(0).minutes(0);
                            },
                            month: function (t) {
                                return t.date(1).hours(0).seconds(0).minutes(0);
                            },
                            day: function (t) {
                                return t.hours(0).seconds(0).minutes(0);
                            },
                            hour: function (t) {
                                return t.seconds(0).minutes(0);
                            },
                            minute: function (t) {
                                return t.seconds(0);
                            },
                        };
                    return o.prop("disabled") || (!s.ignoreReadonly && o.prop("readonly")) || f
                        ? d
                        : (void 0 !== o.val() && 0 !== o.val().trim().length
                              ? X(it(o.val().trim()))
                              : u && s.useCurrent && (s.inline || (o.is("input") && 0 === o.val().trim().length)) && ((e = $()), "string" == typeof s.useCurrent && (e = i[s.useCurrent](e)), X(e)),
                          (f = I()),
                          N(),
                          q(),
                          f.find(".timepicker-hours").hide(),
                          f.find(".timepicker-minutes").hide(),
                          f.find(".timepicker-seconds").hide(),
                          G(),
                          B(),
                          t(window).on("resize", P),
                          f.on("click", "[data-action]", nt),
                          f.on("mousedown", !1),
                          p && p.hasClass("btn") && p.toggleClass("active"),
                          P(),
                          f.show(),
                          s.focusOnShow && !o.is(":focus") && o.focus(),
                          F({ type: "dp.show" }),
                          d);
                },
                ot = function () {
                    return f ? tt() : at();
                },
                rt = function (t) {
                    var e,
                        i,
                        n,
                        a,
                        o = null,
                        r = [],
                        l = {},
                        c = t.which;
                    _[c] = "p";
                    for (e in _) _.hasOwnProperty(e) && "p" === _[e] && (r.push(e), parseInt(e, 10) !== c && (l[e] = !0));
                    for (e in s.keyBinds)
                        if (s.keyBinds.hasOwnProperty(e) && "function" == typeof s.keyBinds[e] && ((n = e.split(" ")), n.length === r.length && C[c] === n[n.length - 1])) {
                            for (a = !0, i = n.length - 2; i >= 0; i--)
                                if (!(C[n[i]] in l)) {
                                    a = !1;
                                    break;
                                }
                            if (a) {
                                o = s.keyBinds[e];
                                break;
                            }
                        }
                    o && (o.call(d, f), t.stopPropagation(), t.preventDefault());
                },
                lt = function (t) {
                    (_[t.which] = "r"), t.stopPropagation(), t.preventDefault();
                },
                ct = function (e) {
                    var i = t(e.target).val().trim(),
                        s = i ? it(i) : null;
                    return X(s), e.stopImmediatePropagation(), !1;
                },
                ht = function () {
                    o.off({ change: ct, blur: blur, keydown: rt, keyup: lt, focus: s.allowInputToggle ? tt : "" }), i.is("input") ? o.off({ focus: at }) : p && (p.off("click", ot), p.off("mousedown", !1));
                },
                dt = function (e) {
                    var i = {};
                    return (
                        t.each(e, function () {
                            var t = it(this);
                            t.isValid() && (i[t.format("YYYY-MM-DD")] = !0);
                        }),
                        !!Object.keys(i).length && i
                    );
                },
                ut = function (e) {
                    var i = {};
                    return (
                        t.each(e, function () {
                            i[this] = !0;
                        }),
                        !!Object.keys(i).length && i
                    );
                },
                pt = function () {
                    var t = s.format || "L LT";
                    (l = t.replace(/(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, function (t) {
                        return (n.localeData().longDateFormat(t) || t).replace(/(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, function (t) {
                            return n.localeData().longDateFormat(t) || t;
                        });
                    })),
                        (c = s.extraFormats ? s.extraFormats.slice() : []),
                        c.indexOf(t) < 0 && c.indexOf(l) < 0 && c.push(l),
                        (r = l.toLowerCase().indexOf("a") < 1 && l.replace(/\[.*?\]/g, "").indexOf("h") < 1),
                        x("y") && (m = 2),
                        x("M") && (m = 1),
                        x("d") && (m = 0),
                        (h = Math.max(m, h)),
                        u || X(n);
                };
            if (
                ((d.destroy = function () {
                    tt(), ht(), i.removeData("DateTimePicker"), i.removeData("date");
                }),
                (d.toggle = ot),
                (d.show = at),
                (d.hide = tt),
                (d.disable = function () {
                    return tt(), p && p.hasClass("btn") && p.addClass("disabled"), o.prop("disabled", !0), d;
                }),
                (d.enable = function () {
                    return p && p.hasClass("btn") && p.removeClass("disabled"), o.prop("disabled", !1), d;
                }),
                (d.ignoreReadonly = function (t) {
                    if (0 === arguments.length) return s.ignoreReadonly;
                    if ("boolean" != typeof t) throw new TypeError("ignoreReadonly () expects a boolean parameter");
                    return (s.ignoreReadonly = t), d;
                }),
                (d.options = function (e) {
                    if (0 === arguments.length) return t.extend(!0, {}, s);
                    if (!(e instanceof Object)) throw new TypeError("options() options parameter should be an object");
                    return (
                        t.extend(!0, s, e),
                        t.each(s, function (t, e) {
                            if (void 0 === d[t]) throw new TypeError("option " + t + " is not recognized!");
                            d[t](e);
                        }),
                        d
                    );
                }),
                (d.date = function (t) {
                    if (0 === arguments.length) return u ? null : n.clone();
                    if (!(null === t || "string" == typeof t || e.isMoment(t) || t instanceof Date)) throw new TypeError("date() parameter must be one of [null, string, moment or Date]");
                    return X(null === t ? null : it(t)), d;
                }),
                (d.format = function (t) {
                    if (0 === arguments.length) return s.format;
                    if ("string" != typeof t && ("boolean" != typeof t || !1 !== t)) throw new TypeError("format() expects a string or boolean:false parameter " + t);
                    return (s.format = t), l && pt(), d;
                }),
                (d.timeZone = function (t) {
                    if (0 === arguments.length) return s.timeZone;
                    if ("string" != typeof t) throw new TypeError("newZone() expects a string parameter");
                    return (s.timeZone = t), d;
                }),
                (d.dayViewHeaderFormat = function (t) {
                    if (0 === arguments.length) return s.dayViewHeaderFormat;
                    if ("string" != typeof t) throw new TypeError("dayViewHeaderFormat() expects a string parameter");
                    return (s.dayViewHeaderFormat = t), d;
                }),
                (d.extraFormats = function (t) {
                    if (0 === arguments.length) return s.extraFormats;
                    if (!1 !== t && !(t instanceof Array)) throw new TypeError("extraFormats() expects an array or false parameter");
                    return (s.extraFormats = t), c && pt(), d;
                }),
                (d.disabledDates = function (e) {
                    if (0 === arguments.length) return s.disabledDates ? t.extend({}, s.disabledDates) : s.disabledDates;
                    if (!e) return (s.disabledDates = !1), G(), d;
                    if (!(e instanceof Array)) throw new TypeError("disabledDates() expects an array parameter");
                    return (s.disabledDates = dt(e)), (s.enabledDates = !1), G(), d;
                }),
                (d.enabledDates = function (e) {
                    if (0 === arguments.length) return s.enabledDates ? t.extend({}, s.enabledDates) : s.enabledDates;
                    if (!e) return (s.enabledDates = !1), G(), d;
                    if (!(e instanceof Array)) throw new TypeError("enabledDates() expects an array parameter");
                    return (s.enabledDates = dt(e)), (s.disabledDates = !1), G(), d;
                }),
                (d.daysOfWeekDisabled = function (t) {
                    if (0 === arguments.length) return s.daysOfWeekDisabled.splice(0);
                    if ("boolean" == typeof t && !t) return (s.daysOfWeekDisabled = !1), G(), d;
                    if (!(t instanceof Array)) throw new TypeError("daysOfWeekDisabled() expects an array parameter");
                    if (
                        ((s.daysOfWeekDisabled = t
                            .reduce(function (t, e) {
                                return (e = parseInt(e, 10)) > 6 || e < 0 || isNaN(e) ? t : (-1 === t.indexOf(e) && t.push(e), t);
                            }, [])
                            .sort()),
                        s.useCurrent && !s.keepInvalid)
                    ) {
                        for (var e = 0; !R(n, "d"); ) {
                            if ((n.add(1, "d"), 31 === e)) throw "Tried 31 times to find a valid date";
                            e++;
                        }
                        X(n);
                    }
                    return G(), d;
                }),
                (d.maxDate = function (t) {
                    if (0 === arguments.length) return s.maxDate ? s.maxDate.clone() : s.maxDate;
                    if ("boolean" == typeof t && !1 === t) return (s.maxDate = !1), G(), d;
                    "string" == typeof t && (("now" !== t && "moment" !== t) || (t = $()));
                    var e = it(t);
                    if (!e.isValid()) throw new TypeError("maxDate() Could not parse date parameter: " + t);
                    if (s.minDate && e.isBefore(s.minDate)) throw new TypeError("maxDate() date parameter is before options.minDate: " + e.format(l));
                    return (s.maxDate = e), s.useCurrent && !s.keepInvalid && n.isAfter(t) && X(s.maxDate), a.isAfter(e) && (a = e.clone().subtract(s.stepping, "m")), G(), d;
                }),
                (d.minDate = function (t) {
                    if (0 === arguments.length) return s.minDate ? s.minDate.clone() : s.minDate;
                    if ("boolean" == typeof t && !1 === t) return (s.minDate = !1), G(), d;
                    "string" == typeof t && (("now" !== t && "moment" !== t) || (t = $()));
                    var e = it(t);
                    if (!e.isValid()) throw new TypeError("minDate() Could not parse date parameter: " + t);
                    if (s.maxDate && e.isAfter(s.maxDate)) throw new TypeError("minDate() date parameter is after options.maxDate: " + e.format(l));
                    return (s.minDate = e), s.useCurrent && !s.keepInvalid && n.isBefore(t) && X(s.minDate), a.isBefore(e) && (a = e.clone().add(s.stepping, "m")), G(), d;
                }),
                (d.defaultDate = function (t) {
                    if (0 === arguments.length) return s.defaultDate ? s.defaultDate.clone() : s.defaultDate;
                    if (!t) return (s.defaultDate = !1), d;
                    "string" == typeof t && (t = "now" === t || "moment" === t ? $() : $(t));
                    var e = it(t);
                    if (!e.isValid()) throw new TypeError("defaultDate() Could not parse date parameter: " + t);
                    if (!R(e)) throw new TypeError("defaultDate() date passed is invalid according to component setup validations");
                    return (s.defaultDate = e), ((s.defaultDate && s.inline) || "" === o.val().trim()) && X(s.defaultDate), d;
                }),
                (d.locale = function (t) {
                    if (0 === arguments.length) return s.locale;
                    if (!e.localeData(t)) throw new TypeError("locale() locale " + t + " is not loaded from moment locales!");
                    return (s.locale = t), n.locale(s.locale), a.locale(s.locale), l && pt(), f && (tt(), at()), d;
                }),
                (d.stepping = function (t) {
                    return 0 === arguments.length ? s.stepping : ((t = parseInt(t, 10)), (isNaN(t) || t < 1) && (t = 1), (s.stepping = t), d);
                }),
                (d.useCurrent = function (t) {
                    var e = ["year", "month", "day", "hour", "minute"];
                    if (0 === arguments.length) return s.useCurrent;
                    if ("boolean" != typeof t && "string" != typeof t) throw new TypeError("useCurrent() expects a boolean or string parameter");
                    if ("string" == typeof t && -1 === e.indexOf(t.toLowerCase())) throw new TypeError("useCurrent() expects a string parameter of " + e.join(", "));
                    return (s.useCurrent = t), d;
                }),
                (d.collapse = function (t) {
                    if (0 === arguments.length) return s.collapse;
                    if ("boolean" != typeof t) throw new TypeError("collapse() expects a boolean parameter");
                    return s.collapse === t ? d : ((s.collapse = t), f && (tt(), at()), d);
                }),
                (d.icons = function (e) {
                    if (0 === arguments.length) return t.extend({}, s.icons);
                    if (!(e instanceof Object)) throw new TypeError("icons() expects parameter to be an Object");
                    return t.extend(s.icons, e), f && (tt(), at()), d;
                }),
                (d.tooltips = function (e) {
                    if (0 === arguments.length) return t.extend({}, s.tooltips);
                    if (!(e instanceof Object)) throw new TypeError("tooltips() expects parameter to be an Object");
                    return t.extend(s.tooltips, e), f && (tt(), at()), d;
                }),
                (d.useStrict = function (t) {
                    if (0 === arguments.length) return s.useStrict;
                    if ("boolean" != typeof t) throw new TypeError("useStrict() expects a boolean parameter");
                    return (s.useStrict = t), d;
                }),
                (d.sideBySide = function (t) {
                    if (0 === arguments.length) return s.sideBySide;
                    if ("boolean" != typeof t) throw new TypeError("sideBySide() expects a boolean parameter");
                    return (s.sideBySide = t), f && (tt(), at()), d;
                }),
                (d.viewMode = function (t) {
                    if (0 === arguments.length) return s.viewMode;
                    if ("string" != typeof t) throw new TypeError("viewMode() expects a string parameter");
                    if (-1 === v.indexOf(t)) throw new TypeError("viewMode() parameter must be one of (" + v.join(", ") + ") value");
                    return (s.viewMode = t), (h = Math.max(v.indexOf(t), m)), B(), d;
                }),
                (d.toolbarPlacement = function (t) {
                    if (0 === arguments.length) return s.toolbarPlacement;
                    if ("string" != typeof t) throw new TypeError("toolbarPlacement() expects a string parameter");
                    if (-1 === w.indexOf(t)) throw new TypeError("toolbarPlacement() parameter must be one of (" + w.join(", ") + ") value");
                    return (s.toolbarPlacement = t), f && (tt(), at()), d;
                }),
                (d.widgetPositioning = function (e) {
                    if (0 === arguments.length) return t.extend({}, s.widgetPositioning);
                    if ("[object Object]" !== {}.toString.call(e)) throw new TypeError("widgetPositioning() expects an object variable");
                    if (e.horizontal) {
                        if ("string" != typeof e.horizontal) throw new TypeError("widgetPositioning() horizontal variable must be a string");
                        if (((e.horizontal = e.horizontal.toLowerCase()), -1 === b.indexOf(e.horizontal))) throw new TypeError("widgetPositioning() expects horizontal parameter to be one of (" + b.join(", ") + ")");
                        s.widgetPositioning.horizontal = e.horizontal;
                    }
                    if (e.vertical) {
                        if ("string" != typeof e.vertical) throw new TypeError("widgetPositioning() vertical variable must be a string");
                        if (((e.vertical = e.vertical.toLowerCase()), -1 === y.indexOf(e.vertical))) throw new TypeError("widgetPositioning() expects vertical parameter to be one of (" + y.join(", ") + ")");
                        s.widgetPositioning.vertical = e.vertical;
                    }
                    return G(), d;
                }),
                (d.calendarWeeks = function (t) {
                    if (0 === arguments.length) return s.calendarWeeks;
                    if ("boolean" != typeof t) throw new TypeError("calendarWeeks() expects parameter to be a boolean value");
                    return (s.calendarWeeks = t), G(), d;
                }),
                (d.showTodayButton = function (t) {
                    if (0 === arguments.length) return s.showTodayButton;
                    if ("boolean" != typeof t) throw new TypeError("showTodayButton() expects a boolean parameter");
                    return (s.showTodayButton = t), f && (tt(), at()), d;
                }),
                (d.showClear = function (t) {
                    if (0 === arguments.length) return s.showClear;
                    if ("boolean" != typeof t) throw new TypeError("showClear() expects a boolean parameter");
                    return (s.showClear = t), f && (tt(), at()), d;
                }),
                (d.widgetParent = function (e) {
                    if (0 === arguments.length) return s.widgetParent;
                    if (("string" == typeof e && (e = t(e)), null !== e && "string" != typeof e && !(e instanceof t))) throw new TypeError("widgetParent() expects a string or a jQuery object parameter");
                    return (s.widgetParent = e), f && (tt(), at()), d;
                }),
                (d.keepOpen = function (t) {
                    if (0 === arguments.length) return s.keepOpen;
                    if ("boolean" != typeof t) throw new TypeError("keepOpen() expects a boolean parameter");
                    return (s.keepOpen = t), d;
                }),
                (d.focusOnShow = function (t) {
                    if (0 === arguments.length) return s.focusOnShow;
                    if ("boolean" != typeof t) throw new TypeError("focusOnShow() expects a boolean parameter");
                    return (s.focusOnShow = t), d;
                }),
                (d.inline = function (t) {
                    if (0 === arguments.length) return s.inline;
                    if ("boolean" != typeof t) throw new TypeError("inline() expects a boolean parameter");
                    return (s.inline = t), d;
                }),
                (d.clear = function () {
                    return et(), d;
                }),
                (d.keyBinds = function (t) {
                    return 0 === arguments.length ? s.keyBinds : ((s.keyBinds = t), d);
                }),
                (d.getMoment = function (t) {
                    return $(t);
                }),
                (d.debug = function (t) {
                    if ("boolean" != typeof t) throw new TypeError("debug() expects a boolean parameter");
                    return (s.debug = t), d;
                }),
                (d.allowInputToggle = function (t) {
                    if (0 === arguments.length) return s.allowInputToggle;
                    if ("boolean" != typeof t) throw new TypeError("allowInputToggle() expects a boolean parameter");
                    return (s.allowInputToggle = t), d;
                }),
                (d.showClose = function (t) {
                    if (0 === arguments.length) return s.showClose;
                    if ("boolean" != typeof t) throw new TypeError("showClose() expects a boolean parameter");
                    return (s.showClose = t), d;
                }),
                (d.keepInvalid = function (t) {
                    if (0 === arguments.length) return s.keepInvalid;
                    if ("boolean" != typeof t) throw new TypeError("keepInvalid() expects a boolean parameter");
                    return (s.keepInvalid = t), d;
                }),
                (d.datepickerInput = function (t) {
                    if (0 === arguments.length) return s.datepickerInput;
                    if ("string" != typeof t) throw new TypeError("datepickerInput() expects a string parameter");
                    return (s.datepickerInput = t), d;
                }),
                (d.parseInputDate = function (t) {
                    if (0 === arguments.length) return s.parseInputDate;
                    if ("function" != typeof t) throw new TypeError("parseInputDate() sholud be as function");
                    return (s.parseInputDate = t), d;
                }),
                (d.disabledTimeIntervals = function (e) {
                    if (0 === arguments.length) return s.disabledTimeIntervals ? t.extend({}, s.disabledTimeIntervals) : s.disabledTimeIntervals;
                    if (!e) return (s.disabledTimeIntervals = !1), G(), d;
                    if (!(e instanceof Array)) throw new TypeError("disabledTimeIntervals() expects an array parameter");
                    return (s.disabledTimeIntervals = e), G(), d;
                }),
                (d.disabledHours = function (e) {
                    if (0 === arguments.length) return s.disabledHours ? t.extend({}, s.disabledHours) : s.disabledHours;
                    if (!e) return (s.disabledHours = !1), G(), d;
                    if (!(e instanceof Array)) throw new TypeError("disabledHours() expects an array parameter");
                    if (((s.disabledHours = ut(e)), (s.enabledHours = !1), s.useCurrent && !s.keepInvalid)) {
                        for (var i = 0; !R(n, "h"); ) {
                            if ((n.add(1, "h"), 24 === i)) throw "Tried 24 times to find a valid date";
                            i++;
                        }
                        X(n);
                    }
                    return G(), d;
                }),
                (d.enabledHours = function (e) {
                    if (0 === arguments.length) return s.enabledHours ? t.extend({}, s.enabledHours) : s.enabledHours;
                    if (!e) return (s.enabledHours = !1), G(), d;
                    if (!(e instanceof Array)) throw new TypeError("enabledHours() expects an array parameter");
                    if (((s.enabledHours = ut(e)), (s.disabledHours = !1), s.useCurrent && !s.keepInvalid)) {
                        for (var i = 0; !R(n, "h"); ) {
                            if ((n.add(1, "h"), 24 === i)) throw "Tried 24 times to find a valid date";
                            i++;
                        }
                        X(n);
                    }
                    return G(), d;
                }),
                (d.viewDate = function (t) {
                    if (0 === arguments.length) return a.clone();
                    if (!t) return (a = n.clone()), d;
                    if (!("string" == typeof t || e.isMoment(t) || t instanceof Date)) throw new TypeError("viewDate() parameter must be one of [string, moment or Date]");
                    return (a = it(t)), M(), d;
                }),
                i.is("input"))
            )
                o = i;
            else if (((o = i.find(s.datepickerInput)), 0 === o.length)) o = i.find("input");
            else if (!o.is("input")) throw new Error('CSS class "' + s.datepickerInput + '" cannot be applied to non input element');
            if ((i.hasClass("input-group") && (p = 0 === i.find(".datepickerbutton").length ? i.find(".input-group-addon") : i.find(".datepickerbutton")), !s.inline && !o.is("input")))
                throw new Error("Could not initialize DateTimePicker without an input element");
            return (
                (n = $()),
                (a = n.clone()),
                t.extend(
                    !0,
                    s,
                    (function () {
                        var e,
                            n = {};
                        return (
                            (e = i.is("input") || s.inline ? i.data() : i.find("input").data()),
                            e.dateOptions && e.dateOptions instanceof Object && (n = t.extend(!0, n, e.dateOptions)),
                            t.each(s, function (t) {
                                var i = "date" + t.charAt(0).toUpperCase() + t.slice(1);
                                void 0 !== e[i] && (n[t] = e[i]);
                            }),
                            n
                        );
                    })()
                ),
                d.options(s),
                pt(),
                (function () {
                    o.on({ change: ct, blur: s.debug ? "" : tt, keydown: rt, keyup: lt, focus: s.allowInputToggle ? at : "" }), i.is("input") ? o.on({ focus: at }) : p && (p.on("click", ot), p.on("mousedown", !1));
                })(),
                o.prop("disabled") && d.disable(),
                o.is("input") && 0 !== o.val().trim().length ? X(it(o.val().trim())) : s.defaultDate && void 0 === o.attr("placeholder") && X(s.defaultDate),
                s.inline && at(),
                d
            );
        };
        return (
            (t.fn.datetimepicker = function (e) {
                e = e || {};
                var s,
                    n = Array.prototype.slice.call(arguments, 1),
                    a = !0,
                    o = ["destroy", "hide", "show", "toggle"];
                if ("object" == typeof e)
                    return this.each(function () {
                        var s,
                            n = t(this);
                        n.data("DateTimePicker") || ((s = t.extend(!0, {}, t.fn.datetimepicker.defaults, e)), n.data("DateTimePicker", i(n, s)));
                    });
                if ("string" == typeof e)
                    return (
                        this.each(function () {
                            var i = t(this),
                                o = i.data("DateTimePicker");
                            if (!o) throw new Error('bootstrap-datetimepicker("' + e + '") method was called on an element that is not using DateTimePicker');
                            (s = o[e].apply(o, n)), (a = s === o);
                        }),
                        a || t.inArray(e, o) > -1 ? this : s
                    );
                throw new TypeError("Invalid arguments for DateTimePicker: " + e);
            }),
            (t.fn.datetimepicker.defaults = {
                timeZone: "",
                format: !1,
                dayViewHeaderFormat: "MMMM YYYY",
                extraFormats: !1,
                stepping: 1,
                minDate: !1,
                maxDate: !1,
                useCurrent: !0,
                collapse: !0,
                locale: e.locale(),
                defaultDate: !1,
                disabledDates: !1,
                enabledDates: !1,
                icons: {
                    time: "fa fa-clock",
                    date: "fa fa-calendar-alt",
                    up: "fa fa-caret-up",
                    down: "fa fa-caret-down",
                    previous: "fa fa-caret-left",
                    next: "fa fa-caret-right",
                    today: "fa fa-",
                    clear: "fa fa-trash-alt",
                    close: "fa fa-times",
                },
                tooltips: {
                    today: "Go to today",
                    clear: "Clear selection",
                    close: "Close the picker",
                    selectMonth: "Select Month",
                    prevMonth: "Previous Month",
                    nextMonth: "Next Month",
                    selectYear: "Select Year",
                    prevYear: "Previous Year",
                    nextYear: "Next Year",
                    selectDecade: "Select Decade",
                    prevDecade: "Previous Decade",
                    nextDecade: "Next Decade",
                    prevCentury: "Previous Century",
                    nextCentury: "Next Century",
                    pickHour: "Pick Hour",
                    incrementHour: "Increment Hour",
                    decrementHour: "Decrement Hour",
                    pickMinute: "Pick Minute",
                    incrementMinute: "Increment Minute",
                    decrementMinute: "Decrement Minute",
                    pickSecond: "Pick Second",
                    incrementSecond: "Increment Second",
                    decrementSecond: "Decrement Second",
                    togglePeriod: "Toggle Period",
                    selectTime: "Select Time",
                },
                useStrict: !1,
                sideBySide: !1,
                daysOfWeekDisabled: !1,
                calendarWeeks: !1,
                viewMode: "days",
                toolbarPlacement: "default",
                showTodayButton: !1,
                showClear: !1,
                showClose: !1,
                widgetPositioning: { horizontal: "auto", vertical: "auto" },
                widgetParent: null,
                ignoreReadonly: !1,
                keepOpen: !1,
                focusOnShow: !0,
                inline: !1,
                keepInvalid: !1,
                datepickerInput: ".datepickerinput",
                keyBinds: {
                    up: function (t) {
                        if (t) {
                            var e = this.date() || this.getMoment();
                            t.find(".datepicker").is(":visible") ? this.date(e.clone().subtract(7, "d")) : this.date(e.clone().add(this.stepping(), "m"));
                        }
                    },
                    down: function (t) {
                        if (!t) return void this.show();
                        var e = this.date() || this.getMoment();
                        t.find(".datepicker").is(":visible") ? this.date(e.clone().add(7, "d")) : this.date(e.clone().subtract(this.stepping(), "m"));
                    },
                    "control up": function (t) {
                        if (t) {
                            var e = this.date() || this.getMoment();
                            t.find(".datepicker").is(":visible") ? this.date(e.clone().subtract(1, "y")) : this.date(e.clone().add(1, "h"));
                        }
                    },
                    "control down": function (t) {
                        if (t) {
                            var e = this.date() || this.getMoment();
                            t.find(".datepicker").is(":visible") ? this.date(e.clone().add(1, "y")) : this.date(e.clone().subtract(1, "h"));
                        }
                    },
                    left: function (t) {
                        if (t) {
                            var e = this.date() || this.getMoment();
                            t.find(".datepicker").is(":visible") && this.date(e.clone().subtract(1, "d"));
                        }
                    },
                    right: function (t) {
                        if (t) {
                            var e = this.date() || this.getMoment();
                            t.find(".datepicker").is(":visible") && this.date(e.clone().add(1, "d"));
                        }
                    },
                    pageUp: function (t) {
                        if (t) {
                            var e = this.date() || this.getMoment();
                            t.find(".datepicker").is(":visible") && this.date(e.clone().subtract(1, "M"));
                        }
                    },
                    pageDown: function (t) {
                        if (t) {
                            var e = this.date() || this.getMoment();
                            t.find(".datepicker").is(":visible") && this.date(e.clone().add(1, "M"));
                        }
                    },
                    enter: function () {
                        this.hide();
                    },
                    escape: function () {
                        this.hide();
                    },
                    "control space": function (t) {
                        t && t.find(".timepicker").is(":visible") && t.find('.btn[data-action="togglePeriod"]').click();
                    },
                    t: function () {
                        this.date(this.getMoment());
                    },
                    delete: function () {
                        this.clear();
                    },
                },
                debug: !1,
                allowInputToggle: !1,
                disabledTimeIntervals: !1,
                disabledHours: !1,
                enabledHours: !1,
                viewDate: !1,
            }),
            t.fn.datetimepicker
        );
    }),
    (function (t, e) {
        "object" == typeof exports && "undefined" != typeof module ? e() : "function" == typeof define && define.amd ? define(e) : e();
    })(0, function () {
        "use strict";
        function t(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
        }
        var e = (function () {
                function t(t, e) {
                    for (var i = 0; i < e.length; i++) {
                        var s = e[i];
                        (s.enumerable = s.enumerable || !1), (s.configurable = !0), "value" in s && (s.writable = !0), Object.defineProperty(t, s.key, s);
                    }
                }
                return function (e, i, s) {
                    return i && t(e.prototype, i), s && t(e, s), e;
                };
            })(),
            i = (function () {
                var i = ".stickySidebar",
                    s = { topSpacing: 0, bottomSpacing: 0, containerSelector: !1, innerWrapperSelector: ".inner-wrapper-sticky", stickyClass: "is-affixed", resizeSensor: !0, minWidth: !1 };
                return (function () {
                    function n(e) {
                        var i = this,
                            a = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                        if ((t(this, n), (this.options = n.extend(s, a)), (this.sidebar = "string" == typeof e ? document.querySelector(e) : e), void 0 === this.sidebar)) throw new Error("There is no specific sidebar element.");
                        (this.sidebarInner = !1),
                            (this.container = this.sidebar.parentElement),
                            (this.affixedType = "STATIC"),
                            (this.direction = "down"),
                            (this.support = { transform: !1, transform3d: !1 }),
                            (this._initialized = !1),
                            (this._reStyle = !1),
                            (this._breakpoint = !1),
                            (this._resizeListeners = []),
                            (this.dimensions = {
                                translateY: 0,
                                topSpacing: 0,
                                lastTopSpacing: 0,
                                bottomSpacing: 0,
                                lastBottomSpacing: 0,
                                sidebarHeight: 0,
                                sidebarWidth: 0,
                                containerTop: 0,
                                containerHeight: 0,
                                viewportHeight: 0,
                                viewportTop: 0,
                                lastViewportTop: 0,
                            }),
                            ["handleEvent"].forEach(function (t) {
                                i[t] = i[t].bind(i);
                            }),
                            this.initialize();
                    }
                    return (
                        e(
                            n,
                            [
                                {
                                    key: "initialize",
                                    value: function () {
                                        var t = this;
                                        if (
                                            (this._setSupportFeatures(),
                                            this.options.innerWrapperSelector && ((this.sidebarInner = this.sidebar.querySelector(this.options.innerWrapperSelector)), null === this.sidebarInner && (this.sidebarInner = !1)),
                                            !this.sidebarInner)
                                        ) {
                                            var e = document.createElement("div");
                                            for (e.setAttribute("class", "inner-wrapper-sticky"), this.sidebar.appendChild(e); this.sidebar.firstChild != e; ) e.appendChild(this.sidebar.firstChild);
                                            this.sidebarInner = this.sidebar.querySelector(".inner-wrapper-sticky");
                                        }
                                        if (this.options.containerSelector) {
                                            var i = document.querySelectorAll(this.options.containerSelector);
                                            if (
                                                ((i = Array.prototype.slice.call(i)).forEach(function (e, i) {
                                                    e.contains(t.sidebar) && (t.container = e);
                                                }),
                                                !i.length)
                                            )
                                                throw new Error("The container does not contains on the sidebar.");
                                        }
                                        "function" != typeof this.options.topSpacing && (this.options.topSpacing = parseInt(this.options.topSpacing) || 0),
                                            "function" != typeof this.options.bottomSpacing && (this.options.bottomSpacing = parseInt(this.options.bottomSpacing) || 0),
                                            this._widthBreakpoint(),
                                            this.calcDimensions(),
                                            this.stickyPosition(),
                                            this.bindEvents(),
                                            (this._initialized = !0);
                                    },
                                },
                                {
                                    key: "bindEvents",
                                    value: function () {
                                        window.addEventListener("resize", this, { passive: !0, capture: !1 }),
                                            window.addEventListener("scroll", this, { passive: !0, capture: !1 }),
                                            this.sidebar.addEventListener("update" + i, this),
                                            this.options.resizeSensor && "undefined" != typeof ResizeSensor && (new ResizeSensor(this.sidebarInner, this.handleEvent), new ResizeSensor(this.container, this.handleEvent));
                                    },
                                },
                                {
                                    key: "handleEvent",
                                    value: function (t) {
                                        this.updateSticky(t);
                                    },
                                },
                                {
                                    key: "calcDimensions",
                                    value: function () {
                                        if (!this._breakpoint) {
                                            var t = this.dimensions;
                                            (t.containerTop = n.offsetRelative(this.container).top),
                                                (t.containerHeight = this.container.clientHeight),
                                                (t.containerBottom = t.containerTop + t.containerHeight),
                                                (t.sidebarHeight = this.sidebarInner.offsetHeight),
                                                (t.sidebarWidth = this.sidebar.offsetWidth),
                                                (t.viewportHeight = window.innerHeight),
                                                this._calcDimensionsWithScroll();
                                        }
                                    },
                                },
                                {
                                    key: "_calcDimensionsWithScroll",
                                    value: function () {
                                        var t = this.dimensions;
                                        (t.sidebarLeft = n.offsetRelative(this.sidebar).left),
                                            (t.viewportTop = document.documentElement.scrollTop || document.body.scrollTop),
                                            (t.viewportBottom = t.viewportTop + t.viewportHeight),
                                            (t.viewportLeft = document.documentElement.scrollLeft || document.body.scrollLeft),
                                            (t.topSpacing = this.options.topSpacing),
                                            (t.bottomSpacing = this.options.bottomSpacing),
                                            "function" == typeof t.topSpacing && (t.topSpacing = parseInt(t.topSpacing(this.sidebar)) || 0),
                                            "function" == typeof t.bottomSpacing && (t.bottomSpacing = parseInt(t.bottomSpacing(this.sidebar)) || 0),
                                            "VIEWPORT-TOP" === this.affixedType
                                                ? t.topSpacing < t.lastTopSpacing && ((t.translateY += t.lastTopSpacing - t.topSpacing), (this._reStyle = !0))
                                                : "VIEWPORT-BOTTOM" === this.affixedType && t.bottomSpacing < t.lastBottomSpacing && ((t.translateY += t.lastBottomSpacing - t.bottomSpacing), (this._reStyle = !0)),
                                            (t.lastTopSpacing = t.topSpacing),
                                            (t.lastBottomSpacing = t.bottomSpacing);
                                    },
                                },
                                {
                                    key: "isSidebarFitsViewport",
                                    value: function () {
                                        return this.dimensions.sidebarHeight < this.dimensions.viewportHeight;
                                    },
                                },
                                {
                                    key: "observeScrollDir",
                                    value: function () {
                                        var t = this.dimensions;
                                        if (t.lastViewportTop !== t.viewportTop) {
                                            var e = "down" === this.direction ? Math.min : Math.max;
                                            t.viewportTop === e(t.viewportTop, t.lastViewportTop) && (this.direction = "down" === this.direction ? "up" : "down");
                                        }
                                    },
                                },
                                {
                                    key: "getAffixType",
                                    value: function () {
                                        var t = this.dimensions,
                                            e = !1;
                                        this._calcDimensionsWithScroll();
                                        var i = t.sidebarHeight + t.containerTop,
                                            s = t.viewportTop + t.topSpacing,
                                            n = t.viewportBottom - t.bottomSpacing;
                                        return (
                                            "up" === this.direction
                                                ? s <= t.containerTop
                                                    ? ((t.translateY = 0), (e = "STATIC"))
                                                    : s <= t.translateY + t.containerTop
                                                    ? ((t.translateY = s - t.containerTop), (e = "VIEWPORT-TOP"))
                                                    : !this.isSidebarFitsViewport() && t.containerTop <= s && (e = "VIEWPORT-UNBOTTOM")
                                                : this.isSidebarFitsViewport()
                                                ? t.sidebarHeight + s >= t.containerBottom
                                                    ? ((t.translateY = t.containerBottom - i), (e = "CONTAINER-BOTTOM"))
                                                    : s >= t.containerTop && ((t.translateY = s - t.containerTop), (e = "VIEWPORT-TOP"))
                                                : t.containerBottom <= n
                                                ? ((t.translateY = t.containerBottom - i), (e = "CONTAINER-BOTTOM"))
                                                : i + t.translateY <= n
                                                ? ((t.translateY = n - i), (e = "VIEWPORT-BOTTOM"))
                                                : t.containerTop + t.translateY <= s && (e = "VIEWPORT-UNBOTTOM"),
                                            (t.translateY = Math.max(0, t.translateY)),
                                            (t.translateY = Math.min(t.containerHeight, t.translateY)),
                                            (t.lastViewportTop = t.viewportTop),
                                            e
                                        );
                                    },
                                },
                                {
                                    key: "_getStyle",
                                    value: function (t) {
                                        if (void 0 !== t) {
                                            var e = { inner: {}, outer: {} },
                                                i = this.dimensions;
                                            switch (t) {
                                                case "VIEWPORT-TOP":
                                                    e.inner = { position: "fixed", top: i.topSpacing, left: i.sidebarLeft - i.viewportLeft, width: i.sidebarWidth };
                                                    break;
                                                case "VIEWPORT-BOTTOM":
                                                    e.inner = { position: "fixed", top: "auto", left: i.sidebarLeft, bottom: i.bottomSpacing, width: i.sidebarWidth };
                                                    break;
                                                case "CONTAINER-BOTTOM":
                                                case "VIEWPORT-UNBOTTOM":
                                                    var s = this._getTranslate(0, i.translateY + "px");
                                                    e.inner = s ? { transform: s } : { position: "absolute", top: i.translateY, width: i.sidebarWidth };
                                            }
                                            switch (t) {
                                                case "VIEWPORT-TOP":
                                                case "VIEWPORT-BOTTOM":
                                                case "VIEWPORT-UNBOTTOM":
                                                case "CONTAINER-BOTTOM":
                                                    e.outer = { height: i.sidebarHeight, position: "relative" };
                                            }
                                            return (
                                                (e.outer = n.extend({ height: "", position: "" }, e.outer)),
                                                (e.inner = n.extend({ position: "relative", top: "", left: "", bottom: "", width: "", transform: this._getTranslate() }, e.inner)),
                                                e
                                            );
                                        }
                                    },
                                },
                                {
                                    key: "stickyPosition",
                                    value: function (t) {
                                        if (!this._breakpoint) {
                                            t = this._reStyle || t || !1;
                                            var e = this.getAffixType(),
                                                s = this._getStyle(e);
                                            if ((this.affixedType != e || t) && e) {
                                                var a = "affix." + e.toLowerCase().replace("viewport-", "") + i;
                                                n.eventTrigger(this.sidebar, a), "STATIC" === e ? n.removeClass(this.sidebar, this.options.stickyClass) : n.addClass(this.sidebar, this.options.stickyClass);
                                                for (var o in s.outer) this.sidebar.style[o] = s.outer[o];
                                                for (var r in s.inner) {
                                                    var l = "number" == typeof s.inner[r] ? "px" : "";
                                                    this.sidebarInner.style[r] = s.inner[r] + l;
                                                }
                                                var c = "affixed." + e.toLowerCase().replace("viewport-", "") + i;
                                                n.eventTrigger(this.sidebar, c);
                                            } else this._initialized && (this.sidebarInner.style.left = s.inner.left);
                                            this.affixedType = e;
                                        }
                                    },
                                },
                                {
                                    key: "_widthBreakpoint",
                                    value: function () {
                                        window.innerWidth <= this.options.minWidth
                                            ? ((this._breakpoint = !0), (this.affixedType = "STATIC"), this.sidebar.removeAttribute("style"), n.removeClass(this.sidebar, this.options.stickyClass), this.sidebarInner.removeAttribute("style"))
                                            : (this._breakpoint = !1);
                                    },
                                },
                                {
                                    key: "updateSticky",
                                    value: function () {
                                        var t = this,
                                            e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                                        this._running ||
                                            ((this._running = !0),
                                            (function (e) {
                                                requestAnimationFrame(function () {
                                                    switch (e) {
                                                        case "scroll":
                                                            t._calcDimensionsWithScroll(), t.observeScrollDir(), t.stickyPosition();
                                                            break;
                                                        case "resize":
                                                        default:
                                                            t._widthBreakpoint(), t.calcDimensions(), t.stickyPosition(!0);
                                                    }
                                                    t._running = !1;
                                                });
                                            })(e.type));
                                    },
                                },
                                {
                                    key: "_setSupportFeatures",
                                    value: function () {
                                        var t = this.support;
                                        (t.transform = n.supportTransform()), (t.transform3d = n.supportTransform(!0));
                                    },
                                },
                                {
                                    key: "_getTranslate",
                                    value: function () {
                                        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
                                            e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
                                            i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0;
                                        return this.support.transform3d ? "translate3d(" + t + ", " + e + ", " + i + ")" : !!this.support.translate && "translate(" + t + ", " + e + ")";
                                    },
                                },
                                {
                                    key: "destroy",
                                    value: function () {
                                        window.removeEventListener("resize", this, { caption: !1 }),
                                            window.removeEventListener("scroll", this, { caption: !1 }),
                                            this.sidebar.classList.remove(this.options.stickyClass),
                                            (this.sidebar.style.minHeight = ""),
                                            this.sidebar.removeEventListener("update" + i, this);
                                        var t = { inner: {}, outer: {} };
                                        (t.inner = { position: "", top: "", left: "", bottom: "", width: "", transform: "" }), (t.outer = { height: "", position: "" });
                                        for (var e in t.outer) this.sidebar.style[e] = t.outer[e];
                                        for (var s in t.inner) this.sidebarInner.style[s] = t.inner[s];
                                        this.options.resizeSensor && "undefined" != typeof ResizeSensor && (ResizeSensor.detach(this.sidebarInner, this.handleEvent), ResizeSensor.detach(this.container, this.handleEvent));
                                    },
                                },
                            ],
                            [
                                {
                                    key: "supportTransform",
                                    value: function (t) {
                                        var e = !1,
                                            i = t ? "perspective" : "transform",
                                            s = i.charAt(0).toUpperCase() + i.slice(1),
                                            n = ["Webkit", "Moz", "O", "ms"],
                                            a = document.createElement("support").style;
                                        return (
                                            (i + " " + n.join(s + " ") + s).split(" ").forEach(function (t, i) {
                                                if (void 0 !== a[t]) return (e = t), !1;
                                            }),
                                            e
                                        );
                                    },
                                },
                                {
                                    key: "eventTrigger",
                                    value: function (t, e, i) {
                                        try {
                                            var s = new CustomEvent(e, { detail: i });
                                        } catch (t) {
                                            (s = document.createEvent("CustomEvent")).initCustomEvent(e, !0, !0, i);
                                        }
                                        t.dispatchEvent(s);
                                    },
                                },
                                {
                                    key: "extend",
                                    value: function (t, e) {
                                        var i = {};
                                        for (var s in t) void 0 !== e[s] ? (i[s] = e[s]) : (i[s] = t[s]);
                                        return i;
                                    },
                                },
                                {
                                    key: "offsetRelative",
                                    value: function (t) {
                                        var e = { left: 0, top: 0 };
                                        do {
                                            var i = t.offsetTop,
                                                s = t.offsetLeft;
                                            isNaN(i) || (e.top += i), isNaN(s) || (e.left += s), (t = "BODY" === t.tagName ? t.parentElement : t.offsetParent);
                                        } while (t);
                                        return e;
                                    },
                                },
                                {
                                    key: "addClass",
                                    value: function (t, e) {
                                        n.hasClass(t, e) || (t.classList ? t.classList.add(e) : (t.className += " " + e));
                                    },
                                },
                                {
                                    key: "removeClass",
                                    value: function (t, e) {
                                        n.hasClass(t, e) && (t.classList ? t.classList.remove(e) : (t.className = t.className.replace(new RegExp("(^|\\b)" + e.split(" ").join("|") + "(\\b|$)", "gi"), " ")));
                                    },
                                },
                                {
                                    key: "hasClass",
                                    value: function (t, e) {
                                        return t.classList ? t.classList.contains(e) : new RegExp("(^| )" + e + "( |$)", "gi").test(t.className);
                                    },
                                },
                            ]
                        ),
                        n
                    );
                })();
            })();
        (window.StickySidebar = i),
            (function () {
                if ("undefined" != typeof window) {
                    var t = window.$ || window.jQuery || window.Zepto;
                    if (t) {
                        (t.fn.stickySidebar = function (e) {
                            return this.each(function () {
                                var s = t(this),
                                    n = t(this).data("stickySidebar");
                                if ((n || ((n = new i(this, "object" == typeof e && e)), s.data("stickySidebar", n)), "string" == typeof e)) {
                                    if (void 0 === n[e] && -1 === ["destroy", "updateSticky"].indexOf(e)) throw new Error('No method named "' + e + '"');
                                    n[e]();
                                }
                            });
                        }),
                            (t.fn.stickySidebar.Constructor = i);
                        var e = t.fn.stickySidebar;
                        t.fn.stickySidebar.noConflict = function () {
                            return (t.fn.stickySidebar = e), this;
                        };
                    }
                }
            })();
    }),
    (function (t, e, i, s) {
        function n(e, i) {
            (this.settings = null),
                (this.options = t.extend({}, n.Defaults, i)),
                (this.$element = t(e)),
                (this._handlers = {}),
                (this._plugins = {}),
                (this._supress = {}),
                (this._current = null),
                (this._speed = null),
                (this._coordinates = []),
                (this._breakpoint = null),
                (this._width = null),
                (this._items = []),
                (this._clones = []),
                (this._mergers = []),
                (this._widths = []),
                (this._invalidated = {}),
                (this._pipe = []),
                (this._drag = { time: null, target: null, pointer: null, stage: { start: null, current: null }, direction: null }),
                (this._states = { current: {}, tags: { initializing: ["busy"], animating: ["busy"], dragging: ["interacting"] } }),
                t.each(
                    ["onResize", "onThrottledResize"],
                    t.proxy(function (e, i) {
                        this._handlers[i] = t.proxy(this[i], this);
                    }, this)
                ),
                t.each(
                    n.Plugins,
                    t.proxy(function (t, e) {
                        this._plugins[t.charAt(0).toLowerCase() + t.slice(1)] = new e(this);
                    }, this)
                ),
                t.each(
                    n.Workers,
                    t.proxy(function (e, i) {
                        this._pipe.push({ filter: i.filter, run: t.proxy(i.run, this) });
                    }, this)
                ),
                this.setup(),
                this.initialize();
        }
        (n.Defaults = {
            items: 3,
            loop: !1,
            center: !1,
            rewind: !1,
            mouseDrag: !0,
            touchDrag: !0,
            pullDrag: !0,
            freeDrag: !1,
            margin: 0,
            stagePadding: 0,
            merge: !1,
            mergeFit: !0,
            autoWidth: !1,
            startPosition: 0,
            rtl: !1,
            smartSpeed: 250,
            fluidSpeed: !1,
            dragEndSpeed: !1,
            responsive: {},
            responsiveRefreshRate: 200,
            responsiveBaseElement: e,
            fallbackEasing: "swing",
            info: !1,
            nestedItemSelector: !1,
            itemElement: "div",
            stageElement: "div",
            refreshClass: "owl-refresh",
            loadedClass: "owl-loaded",
            loadingClass: "owl-loading",
            rtlClass: "owl-rtl",
            responsiveClass: "owl-responsive",
            dragClass: "owl-drag",
            itemClass: "owl-item",
            stageClass: "owl-stage",
            stageOuterClass: "owl-stage-outer",
            grabClass: "owl-grab",
        }),
            (n.Width = { Default: "default", Inner: "inner", Outer: "outer" }),
            (n.Type = { Event: "event", State: "state" }),
            (n.Plugins = {}),
            (n.Workers = [
                {
                    filter: ["width", "settings"],
                    run: function () {
                        this._width = this.$element.width();
                    },
                },
                {
                    filter: ["width", "items", "settings"],
                    run: function (t) {
                        t.current = this._items && this._items[this.relative(this._current)];
                    },
                },
                {
                    filter: ["items", "settings"],
                    run: function () {
                        this.$stage.children(".cloned").remove();
                    },
                },
                {
                    filter: ["width", "items", "settings"],
                    run: function (t) {
                        var e = this.settings.margin || "",
                            i = !this.settings.autoWidth,
                            s = this.settings.rtl,
                            n = { width: "auto", "margin-left": s ? e : "", "margin-right": s ? "" : e };
                        !i && this.$stage.children().css(n), (t.css = n);
                    },
                },
                {
                    filter: ["width", "items", "settings"],
                    run: function (t) {
                        var e = (this.width() / this.settings.items).toFixed(3) - this.settings.margin,
                            i = null,
                            s = this._items.length,
                            n = !this.settings.autoWidth,
                            a = [];
                        for (t.items = { merge: !1, width: e }; s--; )
                            (i = this._mergers[s]), (i = (this.settings.mergeFit && Math.min(i, this.settings.items)) || i), (t.items.merge = i > 1 || t.items.merge), (a[s] = n ? e * i : this._items[s].width());
                        this._widths = a;
                    },
                },
                {
                    filter: ["items", "settings"],
                    run: function () {
                        var e = [],
                            i = this._items,
                            s = this.settings,
                            n = Math.max(2 * s.items, 4),
                            a = 2 * Math.ceil(i.length / 2),
                            o = s.loop && i.length ? (s.rewind ? n : Math.max(n, a)) : 0,
                            r = "",
                            l = "";
                        for (o /= 2; o--; ) e.push(this.normalize(e.length / 2, !0)), (r += i[e[e.length - 1]][0].outerHTML), e.push(this.normalize(i.length - 1 - (e.length - 1) / 2, !0)), (l = i[e[e.length - 1]][0].outerHTML + l);
                        (this._clones = e), t(r).addClass("cloned").appendTo(this.$stage), t(l).addClass("cloned").prependTo(this.$stage);
                    },
                },
                {
                    filter: ["width", "items", "settings"],
                    run: function () {
                        for (var t = this.settings.rtl ? 1 : -1, e = this._clones.length + this._items.length, i = -1, s = 0, n = 0, a = []; ++i < e; )
                            (s = a[i - 1] || 0), (n = this._widths[this.relative(i)] + this.settings.margin), a.push(s + n * t);
                        this._coordinates = a;
                    },
                },
                {
                    filter: ["width", "items", "settings"],
                    run: function () {
                        var t = this.settings.stagePadding,
                            e = this._coordinates,
                            i = { width: Math.ceil(Math.abs(e[e.length - 1])) + 2 * t, "padding-left": t || "", "padding-right": t || "" };
                        this.$stage.css(i);
                    },
                },
                {
                    filter: ["width", "items", "settings"],
                    run: function (t) {
                        var e = this._coordinates.length,
                            i = !this.settings.autoWidth,
                            s = this.$stage.children();
                        if (i && t.items.merge) for (; e--; ) (t.css.width = this._widths[this.relative(e)]), s.eq(e).css(t.css);
                        else i && ((t.css.width = t.items.width), s.css(t.css));
                    },
                },
                {
                    filter: ["items"],
                    run: function () {
                        this._coordinates.length < 1 && this.$stage.removeAttr("style");
                    },
                },
                {
                    filter: ["width", "items", "settings"],
                    run: function (t) {
                        (t.current = t.current ? this.$stage.children().index(t.current) : 0), (t.current = Math.max(this.minimum(), Math.min(this.maximum(), t.current))), this.reset(t.current);
                    },
                },
                {
                    filter: ["position"],
                    run: function () {
                        this.animate(this.coordinates(this._current));
                    },
                },
                {
                    filter: ["width", "position", "items", "settings"],
                    run: function () {
                        var t,
                            e,
                            i,
                            s,
                            n = this.settings.rtl ? 1 : -1,
                            a = 2 * this.settings.stagePadding,
                            o = this.coordinates(this.current()) + a,
                            r = o + this.width() * n,
                            l = [];
                        for (i = 0, s = this._coordinates.length; i < s; i++)
                            (t = this._coordinates[i - 1] || 0), (e = Math.abs(this._coordinates[i]) + a * n), ((this.op(t, "<=", o) && this.op(t, ">", r)) || (this.op(e, "<", o) && this.op(e, ">", r))) && l.push(i);
                        this.$stage.children(".active").removeClass("active"),
                            this.$stage.children(":eq(" + l.join("), :eq(") + ")").addClass("active"),
                            this.settings.center && (this.$stage.children(".center").removeClass("center"), this.$stage.children().eq(this.current()).addClass("center"));
                    },
                },
            ]),
            (n.prototype.initialize = function () {
                if ((this.enter("initializing"), this.trigger("initialize"), this.$element.toggleClass(this.settings.rtlClass, this.settings.rtl), this.settings.autoWidth && !this.is("pre-loading"))) {
                    var e, i, n;
                    (e = this.$element.find("img")), (i = this.settings.nestedItemSelector ? "." + this.settings.nestedItemSelector : s), (n = this.$element.children(i).width()), e.length && n <= 0 && this.preloadAutoWidthImages(e);
                }
                this.$element.addClass(this.options.loadingClass),
                    (this.$stage = t("<" + this.settings.stageElement + ' class="' + this.settings.stageClass + '"/>').wrap('<div class="' + this.settings.stageOuterClass + '"/>')),
                    this.$element.append(this.$stage.parent()),
                    this.replace(this.$element.children().not(this.$stage.parent())),
                    this.$element.is(":visible") ? this.refresh() : this.invalidate("width"),
                    this.$element.removeClass(this.options.loadingClass).addClass(this.options.loadedClass),
                    this.registerEventHandlers(),
                    this.leave("initializing"),
                    this.trigger("initialized");
            }),
            (n.prototype.setup = function () {
                var e = this.viewport(),
                    i = this.options.responsive,
                    s = -1,
                    n = null;
                i
                    ? (t.each(i, function (t) {
                          t <= e && t > s && (s = Number(t));
                      }),
                      (n = t.extend({}, this.options, i[s])),
                      "function" == typeof n.stagePadding && (n.stagePadding = n.stagePadding()),
                      delete n.responsive,
                      n.responsiveClass && this.$element.attr("class", this.$element.attr("class").replace(new RegExp("(" + this.options.responsiveClass + "-)\\S+\\s", "g"), "$1" + s)))
                    : (n = t.extend({}, this.options)),
                    this.trigger("change", { property: { name: "settings", value: n } }),
                    (this._breakpoint = s),
                    (this.settings = n),
                    this.invalidate("settings"),
                    this.trigger("changed", { property: { name: "settings", value: this.settings } });
            }),
            (n.prototype.optionsLogic = function () {
                this.settings.autoWidth && ((this.settings.stagePadding = !1), (this.settings.merge = !1));
            }),
            (n.prototype.prepare = function (e) {
                var i = this.trigger("prepare", { content: e });
                return (
                    i.data ||
                        (i.data = t("<" + this.settings.itemElement + "/>")
                            .addClass(this.options.itemClass)
                            .append(e)),
                    this.trigger("prepared", { content: i.data }),
                    i.data
                );
            }),
            (n.prototype.update = function () {
                for (
                    var e = 0,
                        i = this._pipe.length,
                        s = t.proxy(function (t) {
                            return this[t];
                        }, this._invalidated),
                        n = {};
                    e < i;

                )
                    (this._invalidated.all || t.grep(this._pipe[e].filter, s).length > 0) && this._pipe[e].run(n), e++;
                (this._invalidated = {}), !this.is("valid") && this.enter("valid");
            }),
            (n.prototype.width = function (t) {
                switch ((t = t || n.Width.Default)) {
                    case n.Width.Inner:
                    case n.Width.Outer:
                        return this._width;
                    default:
                        return this._width - 2 * this.settings.stagePadding + this.settings.margin;
                }
            }),
            (n.prototype.refresh = function () {
                this.enter("refreshing"),
                    this.trigger("refresh"),
                    this.setup(),
                    this.optionsLogic(),
                    this.$element.addClass(this.options.refreshClass),
                    this.update(),
                    this.$element.removeClass(this.options.refreshClass),
                    this.leave("refreshing"),
                    this.trigger("refreshed");
            }),
            (n.prototype.onThrottledResize = function () {
                e.clearTimeout(this.resizeTimer), (this.resizeTimer = e.setTimeout(this._handlers.onResize, this.settings.responsiveRefreshRate));
            }),
            (n.prototype.onResize = function () {
                return (
                    !!this._items.length &&
                    this._width !== this.$element.width() &&
                    !!this.$element.is(":visible") &&
                    (this.enter("resizing"), this.trigger("resize").isDefaultPrevented() ? (this.leave("resizing"), !1) : (this.invalidate("width"), this.refresh(), this.leave("resizing"), void this.trigger("resized")))
                );
            }),
            (n.prototype.registerEventHandlers = function () {
                t.support.transition && this.$stage.on(t.support.transition.end + ".owl.core", t.proxy(this.onTransitionEnd, this)),
                    !1 !== this.settings.responsive && this.on(e, "resize", this._handlers.onThrottledResize),
                    this.settings.mouseDrag &&
                        (this.$element.addClass(this.options.dragClass),
                        this.$stage.on("mousedown.owl.core", t.proxy(this.onDragStart, this)),
                        this.$stage.on("dragstart.owl.core selectstart.owl.core", function () {
                            return !1;
                        })),
                    this.settings.touchDrag && (this.$stage.on("touchstart.owl.core", t.proxy(this.onDragStart, this)), this.$stage.on("touchcancel.owl.core", t.proxy(this.onDragEnd, this)));
            }),
            (n.prototype.onDragStart = function (e) {
                var s = null;
                3 !== e.which &&
                    (t.support.transform
                        ? ((s = this.$stage
                              .css("transform")
                              .replace(/.*\(|\)| /g, "")
                              .split(",")),
                          (s = { x: s[16 === s.length ? 12 : 4], y: s[16 === s.length ? 13 : 5] }))
                        : ((s = this.$stage.position()), (s = { x: this.settings.rtl ? s.left + this.$stage.width() - this.width() + this.settings.margin : s.left, y: s.top })),
                    this.is("animating") && (t.support.transform ? this.animate(s.x) : this.$stage.stop(), this.invalidate("position")),
                    this.$element.toggleClass(this.options.grabClass, "mousedown" === e.type),
                    this.speed(0),
                    (this._drag.time = new Date().getTime()),
                    (this._drag.target = t(e.target)),
                    (this._drag.stage.start = s),
                    (this._drag.stage.current = s),
                    (this._drag.pointer = this.pointer(e)),
                    t(i).on("mouseup.owl.core touchend.owl.core", t.proxy(this.onDragEnd, this)),
                    t(i).one(
                        "mousemove.owl.core touchmove.owl.core",
                        t.proxy(function (e) {
                            var s = this.difference(this._drag.pointer, this.pointer(e));
                            t(i).on("mousemove.owl.core touchmove.owl.core", t.proxy(this.onDragMove, this)), (Math.abs(s.x) < Math.abs(s.y) && this.is("valid")) || (e.preventDefault(), this.enter("dragging"), this.trigger("drag"));
                        }, this)
                    ));
            }),
            (n.prototype.onDragMove = function (t) {
                var e = null,
                    i = null,
                    s = null,
                    n = this.difference(this._drag.pointer, this.pointer(t)),
                    a = this.difference(this._drag.stage.start, n);
                this.is("dragging") &&
                    (t.preventDefault(),
                    this.settings.loop
                        ? ((e = this.coordinates(this.minimum())), (i = this.coordinates(this.maximum() + 1) - e), (a.x = ((((a.x - e) % i) + i) % i) + e))
                        : ((e = this.settings.rtl ? this.coordinates(this.maximum()) : this.coordinates(this.minimum())),
                          (i = this.settings.rtl ? this.coordinates(this.minimum()) : this.coordinates(this.maximum())),
                          (s = this.settings.pullDrag ? (-1 * n.x) / 5 : 0),
                          (a.x = Math.max(Math.min(a.x, e + s), i + s))),
                    (this._drag.stage.current = a),
                    this.animate(a.x));
            }),
            (n.prototype.onDragEnd = function (e) {
                var s = this.difference(this._drag.pointer, this.pointer(e)),
                    n = this._drag.stage.current,
                    a = (s.x > 0) ^ this.settings.rtl ? "left" : "right";
                t(i).off(".owl.core"),
                    this.$element.removeClass(this.options.grabClass),
                    ((0 !== s.x && this.is("dragging")) || !this.is("valid")) &&
                        (this.speed(this.settings.dragEndSpeed || this.settings.smartSpeed),
                        this.current(this.closest(n.x, 0 !== s.x ? a : this._drag.direction)),
                        this.invalidate("position"),
                        this.update(),
                        (this._drag.direction = a),
                        (Math.abs(s.x) > 3 || new Date().getTime() - this._drag.time > 300) &&
                            this._drag.target.one("click.owl.core", function () {
                                return !1;
                            })),
                    this.is("dragging") && (this.leave("dragging"), this.trigger("dragged"));
            }),
            (n.prototype.closest = function (e, i) {
                var s = -1,
                    n = this.width(),
                    a = this.coordinates();
                return (
                    this.settings.freeDrag ||
                        t.each(
                            a,
                            t.proxy(function (t, o) {
                                return (
                                    "left" === i && e > o - 30 && e < o + 30
                                        ? (s = t)
                                        : "right" === i && e > o - n - 30 && e < o - n + 30
                                        ? (s = t + 1)
                                        : this.op(e, "<", o) && this.op(e, ">", a[t + 1] || o - n) && (s = "left" === i ? t + 1 : t),
                                    -1 === s
                                );
                            }, this)
                        ),
                    this.settings.loop || (this.op(e, ">", a[this.minimum()]) ? (s = e = this.minimum()) : this.op(e, "<", a[this.maximum()]) && (s = e = this.maximum())),
                    s
                );
            }),
            (n.prototype.animate = function (e) {
                var i = this.speed() > 0;
                this.is("animating") && this.onTransitionEnd(),
                    i && (this.enter("animating"), this.trigger("translate")),
                    t.support.transform3d && t.support.transition
                        ? this.$stage.css({ transform: "translate3d(" + e + "px,0px,0px)", transition: this.speed() / 1e3 + "s" })
                        : i
                        ? this.$stage.animate({ left: e + "px" }, this.speed(), this.settings.fallbackEasing, t.proxy(this.onTransitionEnd, this))
                        : this.$stage.css({ left: e + "px" });
            }),
            (n.prototype.is = function (t) {
                return this._states.current[t] && this._states.current[t] > 0;
            }),
            (n.prototype.current = function (t) {
                if (t === s) return this._current;
                if (0 === this._items.length) return s;
                if (((t = this.normalize(t)), this._current !== t)) {
                    var e = this.trigger("change", { property: { name: "position", value: t } });
                    e.data !== s && (t = this.normalize(e.data)), (this._current = t), this.invalidate("position"), this.trigger("changed", { property: { name: "position", value: this._current } });
                }
                return this._current;
            }),
            (n.prototype.invalidate = function (e) {
                return (
                    "string" === t.type(e) && ((this._invalidated[e] = !0), this.is("valid") && this.leave("valid")),
                    t.map(this._invalidated, function (t, e) {
                        return e;
                    })
                );
            }),
            (n.prototype.reset = function (t) {
                (t = this.normalize(t)) !== s && ((this._speed = 0), (this._current = t), this.suppress(["translate", "translated"]), this.animate(this.coordinates(t)), this.release(["translate", "translated"]));
            }),
            (n.prototype.normalize = function (t, e) {
                var i = this._items.length,
                    n = e ? 0 : this._clones.length;
                return !this.isNumeric(t) || i < 1 ? (t = s) : (t < 0 || t >= i + n) && (t = ((((t - n / 2) % i) + i) % i) + n / 2), t;
            }),
            (n.prototype.relative = function (t) {
                return (t -= this._clones.length / 2), this.normalize(t, !0);
            }),
            (n.prototype.maximum = function (t) {
                var e,
                    i,
                    s,
                    n = this.settings,
                    a = this._coordinates.length;
                if (n.loop) a = this._clones.length / 2 + this._items.length - 1;
                else if (n.autoWidth || n.merge) {
                    for (e = this._items.length, i = this._items[--e].width(), s = this.$element.width(); e-- && !((i += this._items[e].width() + this.settings.margin) > s); );
                    a = e + 1;
                } else a = n.center ? this._items.length - 1 : this._items.length - n.items;
                return t && (a -= this._clones.length / 2), Math.max(a, 0);
            }),
            (n.prototype.minimum = function (t) {
                return t ? 0 : this._clones.length / 2;
            }),
            (n.prototype.items = function (t) {
                return t === s ? this._items.slice() : ((t = this.normalize(t, !0)), this._items[t]);
            }),
            (n.prototype.mergers = function (t) {
                return t === s ? this._mergers.slice() : ((t = this.normalize(t, !0)), this._mergers[t]);
            }),
            (n.prototype.clones = function (e) {
                var i = this._clones.length / 2,
                    n = i + this._items.length,
                    a = function (t) {
                        return t % 2 == 0 ? n + t / 2 : i - (t + 1) / 2;
                    };
                return e === s
                    ? t.map(this._clones, function (t, e) {
                          return a(e);
                      })
                    : t.map(this._clones, function (t, i) {
                          return t === e ? a(i) : null;
                      });
            }),
            (n.prototype.speed = function (t) {
                return t !== s && (this._speed = t), this._speed;
            }),
            (n.prototype.coordinates = function (e) {
                var i,
                    n = 1,
                    a = e - 1;
                return e === s
                    ? t.map(
                          this._coordinates,
                          t.proxy(function (t, e) {
                              return this.coordinates(e);
                          }, this)
                      )
                    : (this.settings.center ? (this.settings.rtl && ((n = -1), (a = e + 1)), (i = this._coordinates[e]), (i += ((this.width() - i + (this._coordinates[a] || 0)) / 2) * n)) : (i = this._coordinates[a] || 0),
                      (i = Math.ceil(i)));
            }),
            (n.prototype.duration = function (t, e, i) {
                return 0 === i ? 0 : Math.min(Math.max(Math.abs(e - t), 1), 6) * Math.abs(i || this.settings.smartSpeed);
            }),
            (n.prototype.to = function (t, e) {
                var i = this.current(),
                    s = null,
                    n = t - this.relative(i),
                    a = (n > 0) - (n < 0),
                    o = this._items.length,
                    r = this.minimum(),
                    l = this.maximum();
                this.settings.loop
                    ? (!this.settings.rewind && Math.abs(n) > o / 2 && (n += -1 * a * o), (t = i + n), (s = ((((t - r) % o) + o) % o) + r) !== t && s - n <= l && s - n > 0 && ((i = s - n), (t = s), this.reset(i)))
                    : this.settings.rewind
                    ? ((l += 1), (t = ((t % l) + l) % l))
                    : (t = Math.max(r, Math.min(l, t))),
                    this.speed(this.duration(i, t, e)),
                    this.current(t),
                    this.$element.is(":visible") && this.update();
            }),
            (n.prototype.next = function (t) {
                (t = t || !1), this.to(this.relative(this.current()) + 1, t);
            }),
            (n.prototype.prev = function (t) {
                (t = t || !1), this.to(this.relative(this.current()) - 1, t);
            }),
            (n.prototype.onTransitionEnd = function (t) {
                if (t !== s && (t.stopPropagation(), (t.target || t.srcElement || t.originalTarget) !== this.$stage.get(0))) return !1;
                this.leave("animating"), this.trigger("translated");
            }),
            (n.prototype.viewport = function () {
                var s;
                return (
                    this.options.responsiveBaseElement !== e
                        ? (s = t(this.options.responsiveBaseElement).width())
                        : e.innerWidth
                        ? (s = e.innerWidth)
                        : i.documentElement && i.documentElement.clientWidth
                        ? (s = i.documentElement.clientWidth)
                        : console.warn("Can not detect viewport width."),
                    s
                );
            }),
            (n.prototype.replace = function (e) {
                this.$stage.empty(),
                    (this._items = []),
                    e && (e = e instanceof jQuery ? e : t(e)),
                    this.settings.nestedItemSelector && (e = e.find("." + this.settings.nestedItemSelector)),
                    e
                        .filter(function () {
                            return 1 === this.nodeType;
                        })
                        .each(
                            t.proxy(function (t, e) {
                                (e = this.prepare(e)), this.$stage.append(e), this._items.push(e), this._mergers.push(1 * e.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1);
                            }, this)
                        ),
                    this.reset(this.isNumeric(this.settings.startPosition) ? this.settings.startPosition : 0),
                    this.invalidate("items");
            }),
            (n.prototype.add = function (e, i) {
                var n = this.relative(this._current);
                (i = i === s ? this._items.length : this.normalize(i, !0)),
                    (e = e instanceof jQuery ? e : t(e)),
                    this.trigger("add", { content: e, position: i }),
                    (e = this.prepare(e)),
                    0 === this._items.length || i === this._items.length
                        ? (0 === this._items.length && this.$stage.append(e),
                          0 !== this._items.length && this._items[i - 1].after(e),
                          this._items.push(e),
                          this._mergers.push(1 * e.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1))
                        : (this._items[i].before(e), this._items.splice(i, 0, e), this._mergers.splice(i, 0, 1 * e.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1)),
                    this._items[n] && this.reset(this._items[n].index()),
                    this.invalidate("items"),
                    this.trigger("added", { content: e, position: i });
            }),
            (n.prototype.remove = function (t) {
                (t = this.normalize(t, !0)) !== s &&
                    (this.trigger("remove", { content: this._items[t], position: t }),
                    this._items[t].remove(),
                    this._items.splice(t, 1),
                    this._mergers.splice(t, 1),
                    this.invalidate("items"),
                    this.trigger("removed", { content: null, position: t }));
            }),
            (n.prototype.preloadAutoWidthImages = function (e) {
                e.each(
                    t.proxy(function (e, i) {
                        this.enter("pre-loading"),
                            (i = t(i)),
                            t(new Image())
                                .one(
                                    "load",
                                    t.proxy(function (t) {
                                        i.attr("src", t.target.src), i.css("opacity", 1), this.leave("pre-loading"), !this.is("pre-loading") && !this.is("initializing") && this.refresh();
                                    }, this)
                                )
                                .attr("src", i.attr("src") || i.attr("data-src") || i.attr("data-src-retina"));
                    }, this)
                );
            }),
            (n.prototype.destroy = function () {
                this.$element.off(".owl.core"), this.$stage.off(".owl.core"), t(i).off(".owl.core"), !1 !== this.settings.responsive && (e.clearTimeout(this.resizeTimer), this.off(e, "resize", this._handlers.onThrottledResize));
                for (var s in this._plugins) this._plugins[s].destroy();
                this.$stage.children(".cloned").remove(),
                    this.$stage.unwrap(),
                    this.$stage.children().contents().unwrap(),
                    this.$stage.children().unwrap(),
                    this.$element
                        .removeClass(this.options.refreshClass)
                        .removeClass(this.options.loadingClass)
                        .removeClass(this.options.loadedClass)
                        .removeClass(this.options.rtlClass)
                        .removeClass(this.options.dragClass)
                        .removeClass(this.options.grabClass)
                        .attr("class", this.$element.attr("class").replace(new RegExp(this.options.responsiveClass + "-\\S+\\s", "g"), ""))
                        .removeData("owl.carousel");
            }),
            (n.prototype.op = function (t, e, i) {
                var s = this.settings.rtl;
                switch (e) {
                    case "<":
                        return s ? t > i : t < i;
                    case ">":
                        return s ? t < i : t > i;
                    case ">=":
                        return s ? t <= i : t >= i;
                    case "<=":
                        return s ? t >= i : t <= i;
                }
            }),
            (n.prototype.on = function (t, e, i, s) {
                t.addEventListener ? t.addEventListener(e, i, s) : t.attachEvent && t.attachEvent("on" + e, i);
            }),
            (n.prototype.off = function (t, e, i, s) {
                t.removeEventListener ? t.removeEventListener(e, i, s) : t.detachEvent && t.detachEvent("on" + e, i);
            }),
            (n.prototype.trigger = function (e, i, s, a, o) {
                var r = { item: { count: this._items.length, index: this.current() } },
                    l = t.camelCase(
                        t
                            .grep(["on", e, s], function (t) {
                                return t;
                            })
                            .join("-")
                            .toLowerCase()
                    ),
                    c = t.Event([e, "owl", s || "carousel"].join(".").toLowerCase(), t.extend({ relatedTarget: this }, r, i));
                return (
                    this._supress[e] ||
                        (t.each(this._plugins, function (t, e) {
                            e.onTrigger && e.onTrigger(c);
                        }),
                        this.register({ type: n.Type.Event, name: e }),
                        this.$element.trigger(c),
                        this.settings && "function" == typeof this.settings[l] && this.settings[l].call(this, c)),
                    c
                );
            }),
            (n.prototype.enter = function (e) {
                t.each(
                    [e].concat(this._states.tags[e] || []),
                    t.proxy(function (t, e) {
                        this._states.current[e] === s && (this._states.current[e] = 0), this._states.current[e]++;
                    }, this)
                );
            }),
            (n.prototype.leave = function (e) {
                t.each(
                    [e].concat(this._states.tags[e] || []),
                    t.proxy(function (t, e) {
                        this._states.current[e]--;
                    }, this)
                );
            }),
            (n.prototype.register = function (e) {
                if (e.type === n.Type.Event) {
                    if ((t.event.special[e.name] || (t.event.special[e.name] = {}), !t.event.special[e.name].owl)) {
                        var i = t.event.special[e.name]._default;
                        (t.event.special[e.name]._default = function (t) {
                            return !i || !i.apply || (t.namespace && -1 !== t.namespace.indexOf("owl")) ? t.namespace && t.namespace.indexOf("owl") > -1 : i.apply(this, arguments);
                        }),
                            (t.event.special[e.name].owl = !0);
                    }
                } else
                    e.type === n.Type.State &&
                        (this._states.tags[e.name] ? (this._states.tags[e.name] = this._states.tags[e.name].concat(e.tags)) : (this._states.tags[e.name] = e.tags),
                        (this._states.tags[e.name] = t.grep(
                            this._states.tags[e.name],
                            t.proxy(function (i, s) {
                                return t.inArray(i, this._states.tags[e.name]) === s;
                            }, this)
                        )));
            }),
            (n.prototype.suppress = function (e) {
                t.each(
                    e,
                    t.proxy(function (t, e) {
                        this._supress[e] = !0;
                    }, this)
                );
            }),
            (n.prototype.release = function (e) {
                t.each(
                    e,
                    t.proxy(function (t, e) {
                        delete this._supress[e];
                    }, this)
                );
            }),
            (n.prototype.pointer = function (t) {
                var i = { x: null, y: null };
                return (
                    (t = t.originalEvent || t || e.event),
                    (t = t.touches && t.touches.length ? t.touches[0] : t.changedTouches && t.changedTouches.length ? t.changedTouches[0] : t),
                    t.pageX ? ((i.x = t.pageX), (i.y = t.pageY)) : ((i.x = t.clientX), (i.y = t.clientY)),
                    i
                );
            }),
            (n.prototype.isNumeric = function (t) {
                return !isNaN(parseFloat(t));
            }),
            (n.prototype.difference = function (t, e) {
                return { x: t.x - e.x, y: t.y - e.y };
            }),
            (t.fn.owlCarousel = function (e) {
                var i = Array.prototype.slice.call(arguments, 1);
                return this.each(function () {
                    var s = t(this),
                        a = s.data("owl.carousel");
                    a ||
                        ((a = new n(this, "object" == typeof e && e)),
                        s.data("owl.carousel", a),
                        t.each(["next", "prev", "to", "destroy", "refresh", "replace", "add", "remove"], function (e, i) {
                            a.register({ type: n.Type.Event, name: i }),
                                a.$element.on(
                                    i + ".owl.carousel.core",
                                    t.proxy(function (t) {
                                        t.namespace && t.relatedTarget !== this && (this.suppress([i]), a[i].apply(this, [].slice.call(arguments, 1)), this.release([i]));
                                    }, a)
                                );
                        })),
                        "string" == typeof e && "_" !== e.charAt(0) && a[e].apply(a, i);
                });
            }),
            (t.fn.owlCarousel.Constructor = n);
    })(window.Zepto || window.jQuery, window, document),
    (function (t, e, i, s) {
        var n = function (e) {
            (this._core = e),
                (this._interval = null),
                (this._visible = null),
                (this._handlers = {
                    "initialized.owl.carousel": t.proxy(function (t) {
                        t.namespace && this._core.settings.autoRefresh && this.watch();
                    }, this),
                }),
                (this._core.options = t.extend({}, n.Defaults, this._core.options)),
                this._core.$element.on(this._handlers);
        };
        (n.Defaults = { autoRefresh: !0, autoRefreshInterval: 500 }),
            (n.prototype.watch = function () {
                this._interval || ((this._visible = this._core.$element.is(":visible")), (this._interval = e.setInterval(t.proxy(this.refresh, this), this._core.settings.autoRefreshInterval)));
            }),
            (n.prototype.refresh = function () {
                this._core.$element.is(":visible") !== this._visible &&
                    ((this._visible = !this._visible), this._core.$element.toggleClass("owl-hidden", !this._visible), this._visible && this._core.invalidate("width") && this._core.refresh());
            }),
            (n.prototype.destroy = function () {
                var t, i;
                e.clearInterval(this._interval);
                for (t in this._handlers) this._core.$element.off(t, this._handlers[t]);
                for (i in Object.getOwnPropertyNames(this)) "function" != typeof this[i] && (this[i] = null);
            }),
            (t.fn.owlCarousel.Constructor.Plugins.AutoRefresh = n);
    })(window.Zepto || window.jQuery, window, document),
    (function (t, e, i, s) {
        var n = function (e) {
            (this._core = e),
                (this._loaded = []),
                (this._handlers = {
                    "initialized.owl.carousel change.owl.carousel resized.owl.carousel": t.proxy(function (e) {
                        if (e.namespace && this._core.settings && this._core.settings.lazyLoad && ((e.property && "position" == e.property.name) || "initialized" == e.type))
                            for (
                                var i = this._core.settings,
                                    s = (i.center && Math.ceil(i.items / 2)) || i.items,
                                    n = (i.center && -1 * s) || 0,
                                    a = (e.property && void 0 !== e.property.value ? e.property.value : this._core.current()) + n,
                                    o = this._core.clones().length,
                                    r = t.proxy(function (t, e) {
                                        this.load(e);
                                    }, this);
                                n++ < s;

                            )
                                this.load(o / 2 + this._core.relative(a)), o && t.each(this._core.clones(this._core.relative(a)), r), a++;
                    }, this),
                }),
                (this._core.options = t.extend({}, n.Defaults, this._core.options)),
                this._core.$element.on(this._handlers);
        };
        (n.Defaults = { lazyLoad: !1 }),
            (n.prototype.load = function (i) {
                var s = this._core.$stage.children().eq(i),
                    n = s && s.find(".owl-lazy");
                !n ||
                    t.inArray(s.get(0), this._loaded) > -1 ||
                    (n.each(
                        t.proxy(function (i, s) {
                            var n,
                                a = t(s),
                                o = (e.devicePixelRatio > 1 && a.attr("data-src-retina")) || a.attr("data-src");
                            this._core.trigger("load", { element: a, url: o }, "lazy"),
                                a.is("img")
                                    ? a
                                          .one(
                                              "load.owl.lazy",
                                              t.proxy(function () {
                                                  a.css("opacity", 1), this._core.trigger("loaded", { element: a, url: o }, "lazy");
                                              }, this)
                                          )
                                          .attr("src", o)
                                    : ((n = new Image()),
                                      (n.onload = t.proxy(function () {
                                          a.css({ "background-image": 'url("' + o + '")', opacity: "1" }), this._core.trigger("loaded", { element: a, url: o }, "lazy");
                                      }, this)),
                                      (n.src = o));
                        }, this)
                    ),
                    this._loaded.push(s.get(0)));
            }),
            (n.prototype.destroy = function () {
                var t, e;
                for (t in this.handlers) this._core.$element.off(t, this.handlers[t]);
                for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null);
            }),
            (t.fn.owlCarousel.Constructor.Plugins.Lazy = n);
    })(window.Zepto || window.jQuery, window, document),
    (function (t, e, i, s) {
        var n = function (e) {
            (this._core = e),
                (this._handlers = {
                    "initialized.owl.carousel refreshed.owl.carousel": t.proxy(function (t) {
                        t.namespace && this._core.settings.autoHeight && this.update();
                    }, this),
                    "changed.owl.carousel": t.proxy(function (t) {
                        t.namespace && this._core.settings.autoHeight && "position" == t.property.name && this.update();
                    }, this),
                    "loaded.owl.lazy": t.proxy(function (t) {
                        t.namespace && this._core.settings.autoHeight && t.element.closest("." + this._core.settings.itemClass).index() === this._core.current() && this.update();
                    }, this),
                }),
                (this._core.options = t.extend({}, n.Defaults, this._core.options)),
                this._core.$element.on(this._handlers);
        };
        (n.Defaults = { autoHeight: !1, autoHeightClass: "owl-height" }),
            (n.prototype.update = function () {
                var e = this._core._current,
                    i = e + this._core.settings.items,
                    s = this._core.$stage.children().toArray().slice(e, i),
                    n = [],
                    a = 0;
                t.each(s, function (e, i) {
                    n.push(t(i).height());
                }),
                    (a = Math.max.apply(null, n)),
                    this._core.$stage.parent().height(a).addClass(this._core.settings.autoHeightClass);
            }),
            (n.prototype.destroy = function () {
                var t, e;
                for (t in this._handlers) this._core.$element.off(t, this._handlers[t]);
                for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null);
            }),
            (t.fn.owlCarousel.Constructor.Plugins.AutoHeight = n);
    })(window.Zepto || window.jQuery, window, document),
    (function (t, e, i, s) {
        var n = function (e) {
            (this._core = e),
                (this._videos = {}),
                (this._playing = null),
                (this._handlers = {
                    "initialized.owl.carousel": t.proxy(function (t) {
                        t.namespace && this._core.register({ type: "state", name: "playing", tags: ["interacting"] });
                    }, this),
                    "resize.owl.carousel": t.proxy(function (t) {
                        t.namespace && this._core.settings.video && this.isInFullScreen() && t.preventDefault();
                    }, this),
                    "refreshed.owl.carousel": t.proxy(function (t) {
                        t.namespace && this._core.is("resizing") && this._core.$stage.find(".cloned .owl-video-frame").remove();
                    }, this),
                    "changed.owl.carousel": t.proxy(function (t) {
                        t.namespace && "position" === t.property.name && this._playing && this.stop();
                    }, this),
                    "prepared.owl.carousel": t.proxy(function (e) {
                        if (e.namespace) {
                            var i = t(e.content).find(".owl-video");
                            i.length && (i.css("display", "none"), this.fetch(i, t(e.content)));
                        }
                    }, this),
                }),
                (this._core.options = t.extend({}, n.Defaults, this._core.options)),
                this._core.$element.on(this._handlers),
                this._core.$element.on(
                    "click.owl.video",
                    ".owl-video-play-icon",
                    t.proxy(function (t) {
                        this.play(t);
                    }, this)
                );
        };
        (n.Defaults = { video: !1, videoHeight: !1, videoWidth: !1 }),
            (n.prototype.fetch = function (t, e) {
                var i = (function () {
                        return t.attr("data-vimeo-id") ? "vimeo" : t.attr("data-vzaar-id") ? "vzaar" : "youtube";
                    })(),
                    s = t.attr("data-vimeo-id") || t.attr("data-youtube-id") || t.attr("data-vzaar-id"),
                    n = t.attr("data-width") || this._core.settings.videoWidth,
                    a = t.attr("data-height") || this._core.settings.videoHeight,
                    o = t.attr("href");
                if (!o) throw new Error("Missing video URL.");
                if (
                    ((s = o.match(/(http:|https:|)\/\/(player.|www.|app.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com)|vzaar\.com)\/(video\/|videos\/|embed\/|channels\/.+\/|groups\/.+\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/)),
                    s[3].indexOf("youtu") > -1)
                )
                    i = "youtube";
                else if (s[3].indexOf("vimeo") > -1) i = "vimeo";
                else {
                    if (!(s[3].indexOf("vzaar") > -1)) throw new Error("Video URL not supported.");
                    i = "vzaar";
                }
                (s = s[6]), (this._videos[o] = { type: i, id: s, width: n, height: a }), e.attr("data-video", o), this.thumbnail(t, this._videos[o]);
            }),
            (n.prototype.thumbnail = function (e, i) {
                var s,
                    n,
                    a,
                    o = i.width && i.height ? 'style="width:' + i.width + "px;height:" + i.height + 'px;"' : "",
                    r = e.find("img"),
                    l = "src",
                    c = "",
                    h = this._core.settings,
                    d = function (t) {
                        (n = '<div class="owl-video-play-icon"></div>'),
                            (s = h.lazyLoad ? '<div class="owl-video-tn ' + c + '" ' + l + '="' + t + '"></div>' : '<div class="owl-video-tn" style="opacity:1;background-image:url(' + t + ')"></div>'),
                            e.after(s),
                            e.after(n);
                    };
                if ((e.wrap('<div class="owl-video-wrapper"' + o + "></div>"), this._core.settings.lazyLoad && ((l = "data-src"), (c = "owl-lazy")), r.length)) return d(r.attr(l)), r.remove(), !1;
                "youtube" === i.type
                    ? ((a = "//img.youtube.com/vi/" + i.id + "/hqdefault.jpg"), d(a))
                    : "vimeo" === i.type
                    ? t.ajax({
                          type: "GET",
                          url: "//vimeo.com/api/v2/video/" + i.id + ".json",
                          jsonp: "callback",
                          dataType: "jsonp",
                          success: function (t) {
                              (a = t[0].thumbnail_large), d(a);
                          },
                      })
                    : "vzaar" === i.type &&
                      t.ajax({
                          type: "GET",
                          url: "//vzaar.com/api/videos/" + i.id + ".json",
                          jsonp: "callback",
                          dataType: "jsonp",
                          success: function (t) {
                              (a = t.framegrab_url), d(a);
                          },
                      });
            }),
            (n.prototype.stop = function () {
                this._core.trigger("stop", null, "video"),
                    this._playing.find(".owl-video-frame").remove(),
                    this._playing.removeClass("owl-video-playing"),
                    (this._playing = null),
                    this._core.leave("playing"),
                    this._core.trigger("stopped", null, "video");
            }),
            (n.prototype.play = function (e) {
                var i,
                    s = t(e.target),
                    n = s.closest("." + this._core.settings.itemClass),
                    a = this._videos[n.attr("data-video")],
                    o = a.width || "100%",
                    r = a.height || this._core.$stage.height();
                this._playing ||
                    (this._core.enter("playing"),
                    this._core.trigger("play", null, "video"),
                    (n = this._core.items(this._core.relative(n.index()))),
                    this._core.reset(n.index()),
                    "youtube" === a.type
                        ? (i = '<iframe width="' + o + '" height="' + r + '" src="//www.youtube.com/embed/' + a.id + "?autoplay=1&rel=0&v=" + a.id + '" frameborder="0" allowfullscreen></iframe>')
                        : "vimeo" === a.type
                        ? (i = '<iframe src="//player.vimeo.com/video/' + a.id + '?autoplay=1" width="' + o + '" height="' + r + '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>')
                        : "vzaar" === a.type && (i = '<iframe frameborder="0"height="' + r + '"width="' + o + '" allowfullscreen mozallowfullscreen webkitAllowFullScreen src="//view.vzaar.com/' + a.id + '/player?autoplay=true"></iframe>'),
                    t('<div class="owl-video-frame">' + i + "</div>").insertAfter(n.find(".owl-video")),
                    (this._playing = n.addClass("owl-video-playing")));
            }),
            (n.prototype.isInFullScreen = function () {
                var e = i.fullscreenElement || i.mozFullScreenElement || i.webkitFullscreenElement;
                return e && t(e).parent().hasClass("owl-video-frame");
            }),
            (n.prototype.destroy = function () {
                var t, e;
                this._core.$element.off("click.owl.video");
                for (t in this._handlers) this._core.$element.off(t, this._handlers[t]);
                for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null);
            }),
            (t.fn.owlCarousel.Constructor.Plugins.Video = n);
    })(window.Zepto || window.jQuery, window, document),
    (function (t, e, i, s) {
        var n = function (e) {
            (this.core = e),
                (this.core.options = t.extend({}, n.Defaults, this.core.options)),
                (this.swapping = !0),
                (this.previous = s),
                (this.next = s),
                (this.handlers = {
                    "change.owl.carousel": t.proxy(function (t) {
                        t.namespace && "position" == t.property.name && ((this.previous = this.core.current()), (this.next = t.property.value));
                    }, this),
                    "drag.owl.carousel dragged.owl.carousel translated.owl.carousel": t.proxy(function (t) {
                        t.namespace && (this.swapping = "translated" == t.type);
                    }, this),
                    "translate.owl.carousel": t.proxy(function (t) {
                        t.namespace && this.swapping && (this.core.options.animateOut || this.core.options.animateIn) && this.swap();
                    }, this),
                }),
                this.core.$element.on(this.handlers);
        };
        (n.Defaults = { animateOut: !1, animateIn: !1 }),
            (n.prototype.swap = function () {
                if (1 === this.core.settings.items && t.support.animation && t.support.transition) {
                    this.core.speed(0);
                    var e,
                        i = t.proxy(this.clear, this),
                        s = this.core.$stage.children().eq(this.previous),
                        n = this.core.$stage.children().eq(this.next),
                        a = this.core.settings.animateIn,
                        o = this.core.settings.animateOut;
                    this.core.current() !== this.previous &&
                        (o &&
                            ((e = this.core.coordinates(this.previous) - this.core.coordinates(this.next)),
                            s
                                .one(t.support.animation.end, i)
                                .css({ left: e + "px" })
                                .addClass("animated owl-animated-out")
                                .addClass(o)),
                        a && n.one(t.support.animation.end, i).addClass("animated owl-animated-in").addClass(a));
                }
            }),
            (n.prototype.clear = function (e) {
                t(e.target).css({ left: "" }).removeClass("animated owl-animated-out owl-animated-in").removeClass(this.core.settings.animateIn).removeClass(this.core.settings.animateOut), this.core.onTransitionEnd();
            }),
            (n.prototype.destroy = function () {
                var t, e;
                for (t in this.handlers) this.core.$element.off(t, this.handlers[t]);
                for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null);
            }),
            (t.fn.owlCarousel.Constructor.Plugins.Animate = n);
    })(window.Zepto || window.jQuery, window, document),
    (function (t, e, i, s) {
        var n = function (e) {
            (this._core = e),
                (this._timeout = null),
                (this._paused = !1),
                (this._handlers = {
                    "changed.owl.carousel": t.proxy(function (t) {
                        t.namespace && "settings" === t.property.name
                            ? this._core.settings.autoplay
                                ? this.play()
                                : this.stop()
                            : t.namespace && "position" === t.property.name && this._core.settings.autoplay && this._setAutoPlayInterval();
                    }, this),
                    "initialized.owl.carousel": t.proxy(function (t) {
                        t.namespace && this._core.settings.autoplay && this.play();
                    }, this),
                    "play.owl.autoplay": t.proxy(function (t, e, i) {
                        t.namespace && this.play(e, i);
                    }, this),
                    "stop.owl.autoplay": t.proxy(function (t) {
                        t.namespace && this.stop();
                    }, this),
                    "mouseover.owl.autoplay": t.proxy(function () {
                        this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.pause();
                    }, this),
                    "mouseleave.owl.autoplay": t.proxy(function () {
                        this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.play();
                    }, this),
                    "touchstart.owl.core": t.proxy(function () {
                        this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.pause();
                    }, this),
                    "touchend.owl.core": t.proxy(function () {
                        this._core.settings.autoplayHoverPause && this.play();
                    }, this),
                }),
                this._core.$element.on(this._handlers),
                (this._core.options = t.extend({}, n.Defaults, this._core.options));
        };
        (n.Defaults = { autoplay: !1, autoplayTimeout: 5e3, autoplayHoverPause: !1, autoplaySpeed: !1 }),
            (n.prototype.play = function (t, e) {
                (this._paused = !1), this._core.is("rotating") || (this._core.enter("rotating"), this._setAutoPlayInterval());
            }),
            (n.prototype._getNextTimeout = function (s, n) {
                return (
                    this._timeout && e.clearTimeout(this._timeout),
                    e.setTimeout(
                        t.proxy(function () {
                            this._paused || this._core.is("busy") || this._core.is("interacting") || i.hidden || this._core.next(n || this._core.settings.autoplaySpeed);
                        }, this),
                        s || this._core.settings.autoplayTimeout
                    )
                );
            }),
            (n.prototype._setAutoPlayInterval = function () {
                this._timeout = this._getNextTimeout();
            }),
            (n.prototype.stop = function () {
                this._core.is("rotating") && (e.clearTimeout(this._timeout), this._core.leave("rotating"));
            }),
            (n.prototype.pause = function () {
                this._core.is("rotating") && (this._paused = !0);
            }),
            (n.prototype.destroy = function () {
                var t, e;
                this.stop();
                for (t in this._handlers) this._core.$element.off(t, this._handlers[t]);
                for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null);
            }),
            (t.fn.owlCarousel.Constructor.Plugins.autoplay = n);
    })(window.Zepto || window.jQuery, window, document),
    (function (t, e, i, s) {
        "use strict";
        var n = function (e) {
            (this._core = e),
                (this._initialized = !1),
                (this._pages = []),
                (this._controls = {}),
                (this._templates = []),
                (this.$element = this._core.$element),
                (this._overrides = { next: this._core.next, prev: this._core.prev, to: this._core.to }),
                (this._handlers = {
                    "prepared.owl.carousel": t.proxy(function (e) {
                        e.namespace && this._core.settings.dotsData && this._templates.push('<div class="' + this._core.settings.dotClass + '">' + t(e.content).find("[data-dot]").addBack("[data-dot]").attr("data-dot") + "</div>");
                    }, this),
                    "added.owl.carousel": t.proxy(function (t) {
                        t.namespace && this._core.settings.dotsData && this._templates.splice(t.position, 0, this._templates.pop());
                    }, this),
                    "remove.owl.carousel": t.proxy(function (t) {
                        t.namespace && this._core.settings.dotsData && this._templates.splice(t.position, 1);
                    }, this),
                    "changed.owl.carousel": t.proxy(function (t) {
                        t.namespace && "position" == t.property.name && this.draw();
                    }, this),
                    "initialized.owl.carousel": t.proxy(function (t) {
                        t.namespace &&
                            !this._initialized &&
                            (this._core.trigger("initialize", null, "navigation"), this.initialize(), this.update(), this.draw(), (this._initialized = !0), this._core.trigger("initialized", null, "navigation"));
                    }, this),
                    "refreshed.owl.carousel": t.proxy(function (t) {
                        t.namespace && this._initialized && (this._core.trigger("refresh", null, "navigation"), this.update(), this.draw(), this._core.trigger("refreshed", null, "navigation"));
                    }, this),
                }),
                (this._core.options = t.extend({}, n.Defaults, this._core.options)),
                this.$element.on(this._handlers);
        };
        (n.Defaults = {
            nav: !1,
            navText: ["prev", "next"],
            navSpeed: !1,
            navElement: "div",
            navContainer: !1,
            navContainerClass: "owl-nav",
            navClass: ["owl-prev", "owl-next"],
            slideBy: 1,
            dotClass: "owl-dot",
            dotsClass: "owl-dots",
            dots: !0,
            dotsEach: !1,
            dotsData: !1,
            dotsSpeed: !1,
            dotsContainer: !1,
        }),
            (n.prototype.initialize = function () {
                var e,
                    i = this._core.settings;
                (this._controls.$relative = (i.navContainer ? t(i.navContainer) : t("<div>").addClass(i.navContainerClass).appendTo(this.$element)).addClass("disabled")),
                    (this._controls.$previous = t("<" + i.navElement + ">")
                        .addClass(i.navClass[0])
                        .html(i.navText[0])
                        .prependTo(this._controls.$relative)
                        .on(
                            "click",
                            t.proxy(function (t) {
                                this.prev(i.navSpeed);
                            }, this)
                        )),
                    (this._controls.$next = t("<" + i.navElement + ">")
                        .addClass(i.navClass[1])
                        .html(i.navText[1])
                        .appendTo(this._controls.$relative)
                        .on(
                            "click",
                            t.proxy(function (t) {
                                this.next(i.navSpeed);
                            }, this)
                        )),
                    i.dotsData || (this._templates = [t("<div>").addClass(i.dotClass).append(t("<span>")).prop("outerHTML")]),
                    (this._controls.$absolute = (i.dotsContainer ? t(i.dotsContainer) : t("<div>").addClass(i.dotsClass).appendTo(this.$element)).addClass("disabled")),
                    this._controls.$absolute.on(
                        "click",
                        "div",
                        t.proxy(function (e) {
                            var s = t(e.target).parent().is(this._controls.$absolute) ? t(e.target).index() : t(e.target).parent().index();
                            e.preventDefault(), this.to(s, i.dotsSpeed);
                        }, this)
                    );
                for (e in this._overrides) this._core[e] = t.proxy(this[e], this);
            }),
            (n.prototype.destroy = function () {
                var t, e, i, s;
                for (t in this._handlers) this.$element.off(t, this._handlers[t]);
                for (e in this._controls) this._controls[e].remove();
                for (s in this.overides) this._core[s] = this._overrides[s];
                for (i in Object.getOwnPropertyNames(this)) "function" != typeof this[i] && (this[i] = null);
            }),
            (n.prototype.update = function () {
                var t,
                    e,
                    i,
                    s = this._core.clones().length / 2,
                    n = s + this._core.items().length,
                    a = this._core.maximum(!0),
                    o = this._core.settings,
                    r = o.center || o.autoWidth || o.dotsData ? 1 : o.dotsEach || o.items;
                if (("page" !== o.slideBy && (o.slideBy = Math.min(o.slideBy, o.items)), o.dots || "page" == o.slideBy))
                    for (this._pages = [], t = s, e = 0, i = 0; t < n; t++) {
                        if (e >= r || 0 === e) {
                            if ((this._pages.push({ start: Math.min(a, t - s), end: t - s + r - 1 }), Math.min(a, t - s) === a)) break;
                            (e = 0), ++i;
                        }
                        e += this._core.mergers(this._core.relative(t));
                    }
            }),
            (n.prototype.draw = function () {
                var e,
                    i = this._core.settings,
                    s = this._core.items().length <= i.items,
                    n = this._core.relative(this._core.current()),
                    a = i.loop || i.rewind;
                this._controls.$relative.toggleClass("disabled", !i.nav || s),
                    i.nav && (this._controls.$previous.toggleClass("disabled", !a && n <= this._core.minimum(!0)), this._controls.$next.toggleClass("disabled", !a && n >= this._core.maximum(!0))),
                    this._controls.$absolute.toggleClass("disabled", !i.dots || s),
                    i.dots &&
                        ((e = this._pages.length - this._controls.$absolute.children().length),
                        i.dotsData && 0 !== e
                            ? this._controls.$absolute.html(this._templates.join(""))
                            : e > 0
                            ? this._controls.$absolute.append(new Array(e + 1).join(this._templates[0]))
                            : e < 0 && this._controls.$absolute.children().slice(e).remove(),
                        this._controls.$absolute.find(".active").removeClass("active"),
                        this._controls.$absolute.children().eq(t.inArray(this.current(), this._pages)).addClass("active"));
            }),
            (n.prototype.onTrigger = function (e) {
                var i = this._core.settings;
                e.page = { index: t.inArray(this.current(), this._pages), count: this._pages.length, size: i && (i.center || i.autoWidth || i.dotsData ? 1 : i.dotsEach || i.items) };
            }),
            (n.prototype.current = function () {
                var e = this._core.relative(this._core.current());
                return t
                    .grep(
                        this._pages,
                        t.proxy(function (t, i) {
                            return t.start <= e && t.end >= e;
                        }, this)
                    )
                    .pop();
            }),
            (n.prototype.getPosition = function (e) {
                var i,
                    s,
                    n = this._core.settings;
                return (
                    "page" == n.slideBy
                        ? ((i = t.inArray(this.current(), this._pages)), (s = this._pages.length), e ? ++i : --i, (i = this._pages[((i % s) + s) % s].start))
                        : ((i = this._core.relative(this._core.current())), (s = this._core.items().length), e ? (i += n.slideBy) : (i -= n.slideBy)),
                    i
                );
            }),
            (n.prototype.next = function (e) {
                t.proxy(this._overrides.to, this._core)(this.getPosition(!0), e);
            }),
            (n.prototype.prev = function (e) {
                t.proxy(this._overrides.to, this._core)(this.getPosition(!1), e);
            }),
            (n.prototype.to = function (e, i, s) {
                var n;
                !s && this._pages.length ? ((n = this._pages.length), t.proxy(this._overrides.to, this._core)(this._pages[((e % n) + n) % n].start, i)) : t.proxy(this._overrides.to, this._core)(e, i);
            }),
            (t.fn.owlCarousel.Constructor.Plugins.Navigation = n);
    })(window.Zepto || window.jQuery, window, document),
    (function (t, e, i, s) {
        "use strict";
        var n = function (i) {
            (this._core = i),
                (this._hashes = {}),
                (this.$element = this._core.$element),
                (this._handlers = {
                    "initialized.owl.carousel": t.proxy(function (i) {
                        i.namespace && "URLHash" === this._core.settings.startPosition && t(e).trigger("hashchange.owl.navigation");
                    }, this),
                    "prepared.owl.carousel": t.proxy(function (e) {
                        if (e.namespace) {
                            var i = t(e.content).find("[data-hash]").addBack("[data-hash]").attr("data-hash");
                            if (!i) return;
                            this._hashes[i] = e.content;
                        }
                    }, this),
                    "changed.owl.carousel": t.proxy(function (i) {
                        if (i.namespace && "position" === i.property.name) {
                            var s = this._core.items(this._core.relative(this._core.current())),
                                n = t
                                    .map(this._hashes, function (t, e) {
                                        return t === s ? e : null;
                                    })
                                    .join();
                            if (!n || e.location.hash.slice(1) === n) return;
                            e.location.hash = n;
                        }
                    }, this),
                }),
                (this._core.options = t.extend({}, n.Defaults, this._core.options)),
                this.$element.on(this._handlers),
                t(e).on(
                    "hashchange.owl.navigation",
                    t.proxy(function (t) {
                        var i = e.location.hash.substring(1),
                            s = this._core.$stage.children(),
                            n = this._hashes[i] && s.index(this._hashes[i]);
                        void 0 !== n && n !== this._core.current() && this._core.to(this._core.relative(n), !1, !0);
                    }, this)
                );
        };
        (n.Defaults = { URLhashListener: !1 }),
            (n.prototype.destroy = function () {
                var i, s;
                t(e).off("hashchange.owl.navigation");
                for (i in this._handlers) this._core.$element.off(i, this._handlers[i]);
                for (s in Object.getOwnPropertyNames(this)) "function" != typeof this[s] && (this[s] = null);
            }),
            (t.fn.owlCarousel.Constructor.Plugins.Hash = n);
    })(window.Zepto || window.jQuery, window, document),
    (function (t, e, i, s) {
        function n(e, i) {
            var n = !1,
                a = e.charAt(0).toUpperCase() + e.slice(1);
            return (
                t.each((e + " " + r.join(a + " ") + a).split(" "), function (t, e) {
                    if (o[e] !== s) return (n = !i || e), !1;
                }),
                n
            );
        }
        function a(t) {
            return n(t, !0);
        }
        var o = t("<support>").get(0).style,
            r = "Webkit Moz O ms".split(" "),
            l = {
                transition: { end: { WebkitTransition: "webkitTransitionEnd", MozTransition: "transitionend", OTransition: "oTransitionEnd", transition: "transitionend" } },
                animation: { end: { WebkitAnimation: "webkitAnimationEnd", MozAnimation: "animationend", OAnimation: "oAnimationEnd", animation: "animationend" } },
            },
            c = {
                csstransforms: function () {
                    return !!n("transform");
                },
                csstransforms3d: function () {
                    return !!n("perspective");
                },
                csstransitions: function () {
                    return !!n("transition");
                },
                cssanimations: function () {
                    return !!n("animation");
                },
            };
        c.csstransitions() && ((t.support.transition = new String(a("transition"))), (t.support.transition.end = l.transition.end[t.support.transition])),
            c.cssanimations() && ((t.support.animation = new String(a("animation"))), (t.support.animation.end = l.animation.end[t.support.animation])),
            c.csstransforms() && ((t.support.transform = new String(a("transform"))), (t.support.transform3d = c.csstransforms3d()));
    })(window.Zepto || window.jQuery, window, document),
    (clickToAddress.prototype.search = function (t, e, i) {
        "use strict";
        var s = this;
        if ("" !== t) {
            this.setProgressBar(0);
            var n = { key: this.key, query: t, id: e, country: this.activeCountry, fingerprint: this.fingerprint, integration: this.tag, js_version: this.jsVersion, sequence: i, type: 0 };
            -1 == i && (n.type = 2),
                void 0 !== this.accessTokenOverride[this.activeCountry] && (n.key = this.accessTokenOverride[this.activeCountry]),
                this.coords != {} && ((n.coords = {}), (n.coords.lat = this.coords.latitude), (n.coords.lng = this.coords.longitude));
            try {
                var a = this.cacheRetrieve(n);
                return s.setProgressBar(1), s.clear(), s.hideErrors(), (s.searchResults = a), s.showResults(), s.focused || s.activeInput.focus(), (s.searchStatus.lastResponseId = i || 0), void s.cacheStore(n, a, i);
            } catch (t) {
                if (-1 == ["cc/cr/01", "cc/cr/02"].indexOf(t)) throw t;
            }
            this.baseURL;
            this.apiRequest("find", n, function (t) {
                s.searchStatus.lastResponseId <= i &&
                    (s.setProgressBar(1), s.clear(), s.hideErrors(), (s.searchResults = t), s.showResults(), s.focused || s.activeInput.focus(), (s.searchStatus.lastResponseId = i || 0), s.cacheStore(n, t, i));
            });
        }
    }),
    (clickToAddress.prototype.getAddressDetails = function (t) {
        "use strict";
        var e = this,
            i = { id: t, country: this.activeCountry, key: this.key, fingerprint: this.fingerprint, js_version: this.jsVersion, integration: this.tag, type: 1 };
        void 0 !== this.accessTokenOverride[this.activeCountry] && (i.key = this.accessTokenOverride[this.activeCountry]), this.coords != {} && (i.coords = this.coords);
        try {
            var s = this.cacheRetrieve(i);
            return e.fillData(s), e.hideErrors(), e.cleanHistory(), void e.cacheStore(i, s);
        } catch (t) {
            if (-1 == ["cc/cr/01", "cc/cr/02"].indexOf(t)) throw t;
        }
        this.baseURL;
        this.apiRequest("retrieve", i, function (t) {
            try {
                e.fillData(t), e.hideErrors(), e.cleanHistory(), e.cacheStore(i, t);
            } catch (t) {
                e.error("JS503");
            }
        });
    }),
    (clickToAddress.prototype.getAvailableCountries = function (t) {
        "use strict";
        var e = this,
            i = { key: this.key, fingerprint: this.fingerprint, js_version: this.jsVersion, integration: this.tag, language: this.countryLanguage };
        this.apiRequest("countries", i, function (i) {
            try {
                (e.serviceReady = 1), (e.validCountries = i.countries), (e.ipLocation = i.ip_location), e.hideErrors();
                try {
                    t();
                } catch (t) {
                    e.error("JS515");
                }
            } catch (t) {
                e.error("JS505");
            }
        });
    }),
    (clickToAddress.prototype.handleApiError = function (t) {
        "use strict";
        if (-1 != [401, 402].indexOf(t.status)) return (this.serviceReady = -1), void this.error("API401");
        var e = {};
        try {
            e = JSON.parse(t.responseText);
        } catch (t) {
            e = {};
        }
        void 0 !== e.error && "string" == typeof e.error.status ? this.error("API500", "API error: [" + e.error.status + "]" + e.error.message) : this.error("API500");
    }),
    (clickToAddress.prototype.apiRequest = function (t, e, i) {
        for (var s = this.baseURL + t, n = Object.keys(this.customParameters), a = 0; a < n.length; a++) e[n[a]] = this.customParameters[n[a]];
        var o = new XMLHttpRequest();
        o.open("POST", s, !0), o.setRequestHeader("Content-Type", "application/json"), o.setRequestHeader("Accept", "application/json");
        var r = this;
        (o.onreadystatechange = function () {
            if (4 === this.readyState) {
                if (401 == this.status) return;
                if (this.status >= 200 && this.status < 400)
                    try {
                        var t = JSON.parse(this.responseText);
                        i(t);
                    } catch (t) {
                        r.error("JS506");
                    }
                else r.handleApiError(this);
            }
        }),
            o.send(JSON.stringify(e));
        setTimeout(function () {
            null !== o && 4 !== o.readyState && (o.abort(), r.error("JS501"));
        }, 1e4);
        o = null;
    }),
    (clickToAddress.prototype.cacheRetrieve = function (t) {
        "use strict";
        if (0 == t.type || 2 == t.type) {
            if (void 0 === this.cache.finds[t.country]) throw "cc/cr/01";
            for (var e = 0; e < this.cache.finds[t.country].length; e++) if (this.cache.finds[t.country][e].query == t.query && this.cache.finds[t.country][e].id == t.id) return this.cache.finds[t.country][e].response;
            throw "cc/cr/02";
        }
        if (1 == t.type) {
            if (void 0 === this.cache.retrieves[t.country]) throw "cc/cr/01";
            for (var e = 0; e < this.cache.retrieves[t.country].length; e++) if (this.cache.retrieves[t.country][e].id == t.id) return this.cache.retrieves[t.country][e].response;
            throw "cc/cr/02";
        }
        throw "cc/cr/03";
    }),
    (clickToAddress.prototype.cacheStore = function (t, e, i) {
        "use strict";
        var i = i || 0;
        if (0 === t.type) {
            void 0 === this.cache.finds[t.country] && (this.cache.finds[t.country] = []);
            var s = Math.abs(binaryIndexOf(this.cache.finds[t.country], i));
            return this.cache.finds[t.country].splice(s, 0, { query: t.query, id: t.id, response: e, sequence: i }), this.cache.finds[t.country].length > 100 && this.cache.finds[t.country].shift(), void this.setHistoryStep();
        }
        if (1 == t.type) {
            void 0 === this.cache.retrieves[t.country] && (this.cache.retrieves[t.country] = []);
            for (var n = 0; n < this.cache.retrieves[t.country].length; n++) if (this.cache.retrieves[t.country][n].id == t.id) return;
            return void this.cache.retrieves[t.country].push({ id: t.id, response: e });
        }
        t.type;
    }),
    (clickToAddress.prototype.history = function (t) {
        "use strict";
        if (this.historyTools) {
            this.cachePos <= -1 && (this.cachePos = 0);
            var e = {},
                i = Object.keys(this.cache.finds[this.activeCountry]).length - 1;
            0 === t ? (this.cachePos++, (e = this.cache.finds[this.activeCountry][i - this.cachePos])) : (this.cachePos--, (e = this.cache.finds[this.activeCountry][i - this.cachePos])),
                this.setHistoryStep(),
                (this.activeInput.value = e.query),
                this.search(e.query, e.id, -1);
        }
    }),
    (clickToAddress.prototype.setHistoryActions = function () {
        "use strict";
        if (this.historyTools) {
            var t = this,
                e = this.searchObj.getElementsByClassName("cc-back")[0],
                i = this.searchObj.getElementsByClassName("cc-forward")[0];
            ccEvent(e, "click", function () {
                "cc-back" == e.className && t.history(0);
            }),
                ccEvent(i, "click", function () {
                    "cc-forward" == i.className && t.history(1);
                });
        }
    }),
    (clickToAddress.prototype.setHistoryStep = function () {
        "use strict";
        if (this.historyTools) {
            var t = this.searchObj.getElementsByClassName("cc-back")[0],
                e = this.searchObj.getElementsByClassName("cc-forward")[0];
            (t.className = "cc-back"), (e.className = "cc-forward");
            var i = 0;
            (void 0 === this.cache.finds[this.activeCountry] || this.cachePos >= Object.keys(this.cache.finds[this.activeCountry]).length - 1 || Object.keys(this.cache.finds[this.activeCountry]).length <= 1) &&
                ((t.className = "cc-back cc-disabled"), i++),
                (void 0 === this.cache.finds[this.activeCountry] || this.cachePos <= 0 || Object.keys(this.cache.finds[this.activeCountry]).length <= 1) && ((e.className = "cc-forward cc-disabled"), i++);
            var s = this.searchObj.getElementsByClassName("c2a_logo");
            s.length && (2 == i ? (this.tools.removeClass(s[0], "hidden"), this.tools.removeClass(s[0], "tools_in_use")) : (this.tools.addClass(s[0], "hidden"), this.tools.addClass(s[0], "tools_in_use")));
        }
    }),
    (clickToAddress.prototype.hideHistory = function () {
        "use strict";
        if (this.historyTools) {
            var t = this.searchObj.getElementsByClassName("cc-back")[0],
                e = this.searchObj.getElementsByClassName("cc-forward")[0];
            (t.className = "cc-back cc-disabled"), (e.className = "cc-forward cc-disabled");
        }
    }),
    (clickToAddress.prototype.cleanHistory = function () {
        "use strict";
        if (!(this.cachePos <= 0 || void 0 === this.cache.finds[this.activeCountry])) {
            var t = Object.keys(this.cache.finds[this.activeCountry]).length - this.cachePos;
            this.cache.finds[this.activeCountry].splice(t, this.cachePos), (this.cachePos = -1);
            var e = Object.keys(this.cache.finds[this.activeCountry]).length;
            (this.activeId = e > 0 ? this.cache.finds[this.activeCountry][e - 1].id : ""), this.setHistoryStep();
        }
    }),
    (clickToAddress.prototype.error = function (t, e) {
        "use strict";
        var i = {
            JS500: { default_message: "Unknown Server Error", level: 0 },
            JS501: { default_message: "API server seems unreachable", level: 0 },
            JS502: { default_message: "API search request resulted in a JS error.", level: 0 },
            JS503: { default_message: "API address retrieve request resulted in a JS error.", level: 0 },
            JS504: { default_message: "onResultSelected callback function resulted in a JS error.", level: 0 },
            JS505: { default_message: "API countrylist retrieve request resulted in a JS error.", level: 0 },
            JS515: { default_message: "Country list retrieve callback function resulted in an error.", level: 0 },
            JS506: { default_message: "JSON parsing error", level: 0 },
            JS401: { default_message: 'Invalid value for countryMatchWith. Fallback to "text"', level: 0 },
            API401: { default_message: "Please review your account; access token restricted from accessing the service.", level: 1 },
            API500: { default_message: "API error occured", level: 1 },
        };
        void 0 === e && (e = void 0 !== i[t] ? i[t].default_message : ""), console.warn("CraftyClicks Debug Error Message: [" + t + "] " + e), 1 == i[t].level && this.info("error"), "function" == typeof this.onError && this.onError(t, e);
    }),
    (clickToAddress.prototype.hideErrors = function () {
        "use strict";
        -1 != this.serviceReady && ((this.errorObj.innerHTML = ""), (this.errorObj.className = "c2a_error c2a_error_hidden"));
    }),
    (clickToAddress.prototype.start_debug = function () {
        "use strict";
        var t = this,
            e = document.createElement("style");
        e.type = "text/css";
        var i =
            "#cc_c2a_debug { " +
            [
                "position: fixed;",
                "right: 0px;",
                "background-color: white;",
                "top: 50px;",
                "border: 1px solid black;",
                "border-top-left-radius: 5px;",
                "border-bottom-left-radius: 5px;",
                "padding: 5px;",
                "text-align: center;",
                "border-right: none;",
            ].join(" ") +
            " }";
        (i += " #cc_c2a_debug > div{" + ["border-radius: 5px;", "padding: 5px;", "border: 1px solid black;", "margin-bottom: 5px;"].join(" ") + "}"),
            (i += " #cc_c2a_debug .c2a_toggle.c2a_toggle_on{ background-color: #87D37C; color: white; }"),
            (i += " #cc_c2a_debug .c2a_toggle{ cursor: pointer; }"),
            e.styleSheet ? (e.styleSheet.cssText = i) : e.appendChild(document.createTextNode(i)),
            document.getElementsByTagName("head")[0].appendChild(e);
        var s = document.createElement("DIV");
        s.id = "cc_c2a_debug";
        var n = ['<div><img style="width: 40px;" src="https://craftyclicks.co.uk/wp-content/themes/craftyclicks_wp_theme/assets/images/product/prod_gl.png"/></div>', '<div id="toggl_transl" class="c2a_toggle">Toggle Transl</div>'].join("");
        (s.innerHTML = n), document.body.appendChild(s);
        var a = document.getElementById("toggl_transl");
        ccEvent(a, "click", function () {
            (t.transliterate = !t.transliterate), t.transliterate ? ((a.className = "c2a_toggle c2a_toggle_on"), t.addTransl()) : (a.className = "c2a_toggle");
        });
    }),
    (clickToAddress.prototype.info = function (t, e) {
        "use strict";
        var i = this.searchObj.getElementsByClassName("infoBar")[0];
        switch (t) {
            case "pre-trial":
                (i.className += " infoActive infoTrial"),
                    (i.innerHTML =
                        '<h5>Access token is needed!</h5><p>To get a trial token, sign up for a <a href="https://account.craftyclicks.co.uk/login/signup">free trial</a>.</p><p>Then find the placeholder accessToken xxxxx-xxxxx-xxxxx-xxxxx in your HTML and replace it with a your own token.</p>');
                break;
            case "no-results":
                (i.className += " infoActive infoWarning"), (i.innerHTML = this.texts.no_results);
                break;
            case "error":
                (i.className += " infoActive infoWarning"), (i.innerHTML = this.texts.generic_error);
                break;
            default:
                (i.className = "infoBar"), (i.innerHTML = "");
        }
    }),
    (clickToAddress.prototype.setFingerPrint = function () {
        "use strict";
        var t = Math.floor(Math.random() * (9e15 + 1) + 1e15);
        this.fingerprint = t.toString(16);
    }),
    (clickToAddress.prototype.getFingerPrint = function () {
        "use strict";
        return this.fingerprint;
    }),
    (clickToAddress.prototype.fillData = function (t) {
        "use strict";
        var e = null;
        if (((e = this.transliterate && "function" == typeof this.transl ? JSON.parse(this.transl(JSON.stringify(t))) : t), void 0 !== this.activeDom.country)) {
            var i = this.activeDom.country.getElementsByTagName("option");
            if (i.length) {
                for (var s = "", n = 0; n < i.length && "" === s; n++) {
                    if (i[n].innerHTML == this.validCountries[this.activeCountryId].country_name) {
                        s = i[n].value;
                        break;
                    }
                    if (i[n].value == this.activeCountry) {
                        s = i[n].value;
                        break;
                    }
                }
                this.activeDom.country.value = s;
            } else this.activeDom.country.value = this.validCountries[this.activeCountryId].country_name;
        }
        if (void 0 !== this.activeDom.line_1) {
            var a = [];
            if (
                ("" === e.result.line_1 && "" !== e.result.company_name && (e.result.line_1 = e.result.company_name),
                (this.activeDom.line_1.value = e.result.line_1),
                void 0 !== this.activeDom.line_2 ? (this.activeDom.line_2.value = e.result.line_2) : "" !== e.result.line_2 && a.push(e.result.line_2),
                "" !== e.result.company_name
                    ? void 0 !== this.activeDom.company
                        ? ((this.activeDom.company.value = e.result.company_name), (this.lastSearchCompanyValue = e.result.company_name))
                        : (this.activeDom.line_1.value = e.result.company_name + ", " + this.activeDom.line_1.value)
                    : void 0 !== this.activeDom.company && ("" !== this.lastSearchCompanyValue && this.activeDom.company.value == this.lastSearchCompanyValue && (this.activeDom.company.value = ""), (this.lastSearchCompanyValue = "")),
                void 0 !== this.activeDom.postcode ? (this.activeDom.postcode.value = e.result.postal_code) : a.push(e.result.postal_code),
                void 0 !== this.activeDom.town
                    ? "" !== e.result.locality
                        ? (this.activeDom.town.value = e.result.locality)
                        : (this.activeDom.town.value = e.result.dependent_locality)
                    : "" !== e.result.locality
                    ? a.push(e.result.locality)
                    : a.push(e.result.dependent_locality),
                "" !== e.result.province_code || "" !== e.result.province_name)
            ) {
                var o = { preferred: e.result.province, code: e.result.province_code, name: e.result.province_name };
                "function" == typeof this.getCfg("onSetCounty") ? this.getCfg("onSetCounty")(this, this.activeDom, o) : void 0 !== this.activeDom.county && this.setCounty(this.activeDom.county, o);
            }
            a.length && (void 0 !== this.activeDom.line_2 ? (this.activeDom.line_2.value += ", " + a.join(", ")) : (this.activeDom.line_1.value += ", " + a.join(", ")));
        }
        if ("function" == typeof this.getCfg("onResultSelected"))
            try {
                (e.result.country = this.validCountries[this.activeCountryId]), this.getCfg("onResultSelected")(this, this.activeDom, e.result);
            } catch (t) {
                this.error("JS504");
            }
        this.hide(!0);
    }),
    (clickToAddress.prototype.setCounty = function (t, e) {
        "use strict";
        if ("SELECT" == t.tagName) {
            var i = e.code;
            "" === i && (i = e.name);
            var s = t.getElementsByTagName("option");
            if (s.length) {
                for (var n = 0, a = removeDiacritics(e.name), o = removeDiacritics(e.code), r = 0; r < s.length; r++) {
                    var l = removeDiacritics(s[r].innerHTML),
                        c = removeDiacritics(s[r].value);
                    if (("" !== l && (l == a || l == o)) || ("" !== c && (c == a || c == o))) {
                        (i = s[r].value), n++;
                        break;
                    }
                }
                if (!n) {
                    var h = e.name;
                    "" === h && (h = e.code);
                    for (var d = removeDiacritics(h), u = { rank: 0, ids: [] }, r = 0; r < s.length; r++) {
                        for (var p = removeDiacritics(s[r].innerHTML), f = 0, m = [], g = 0; g < d.length; g++) {
                            m[g] = [];
                            for (var v = 0; v < p.length; v++) d[g] == p[v] ? ((m[g][v] = g > 0 && v > 0 ? m[g - 1][v - 1] + 1 : 1), m[g][v] > f && (f = m[g][v])) : (m[g][v] = 0);
                        }
                        u.rank < f && ((u.rank = f), (u.ids = [])), u.rank == f && u.ids.push(r);
                    }
                    if (u.ids.length > 1) {
                        for (var y = { id: 0, rank: 1e3 }, r = 0; r < u.ids.length; r++) {
                            var b = (function (t, e) {
                                for (var i = {}, s = {}, n = 0; n < t.length; n++) void 0 === i[t[n]] ? (i[t[n]] = 1) : i[t[n]]++;
                                for (var n = 0; n < e.length; n++) void 0 === s[e[n]] ? (s[e[n]] = 1) : s[e[n]]++;
                                for (var a = 0, o = Object.keys(i), n = 0; n < o.length; n++) void 0 === s[o[n]] ? (a += i[o[n]]) : ((a += Math.abs(i[o[n]] - s[o[n]])), delete s[o]);
                                for (var r = Object.keys(s), n = 0; n < r.length; n++) a += s[r[n]];
                                return a;
                            })(removeDiacritics(s[u.ids[r]].innerHTML), d);
                            b < y.rank && ((y.rank = b), (y.id = r));
                        }
                        i = s[u.ids[y.id]].value;
                    } else i = s[u.ids[0]].value;
                }
                t.value = i;
            }
        } else {
            var w = e.preferred;
            "" === w && (w = e.name), "" === w && (w = e.code), (t.value = w);
        }
    }),
    (clickToAddress.prototype.showResults = function (t) {
        "use strict";
        (this.scrollPosition = 0), this.resetSelector(), this.info("clear");
        for (var e = "", i = this.searchResults.results.length - this.scrollLimit * this.scrollPosition, s = 0; s < i && s < this.scrollLimit; s++) e += "<li></li>";
        this.resultList.innerHTML = e;
        var n = this.resultList.getElementsByTagName("li");
        this.resultList.scrollTop = 0;
        for (var a = this, s = 0; s < n.length && s < this.scrollLimit; s++) {
            var o = JSON.parse(JSON.stringify(this.searchResults.results[s])),
                r = o.labels.join(", ");
            if (a.transliterate && "function" == typeof a.transl) for (var l = 0; l < o.labels.length; l++) o.labels[l] = a.transl(o.labels[l]);
            var c = "<div>";
            if (
                ("string" == typeof o.labels[0] && "" !== o.labels[0] && (c += "<span>" + o.labels[0] + "</span>"),
                "string" == typeof o.labels[1] && "" !== o.labels[1] && (c += '<span class="light">' + o.labels[1] + "</span>"),
                "number" == typeof o.count && o.count > 1 && (c += '<span class="light">' + a.texts.more.replace("{{value}}", o.count) + "</span>"),
                (c += "</div>"),
                (n[s].innerHTML = c),
                n[s].setAttribute("title", r),
                void 0 === o.count || void 0 === o.id)
            )
                throw "server error";
            ccData(n[s], "id", o.id.toString()), ccData(n[s], "count", o.count.toString()), 1 != o.count && (n[s].className = "cc-filter");
        }
        for (var s = 0; s < n.length; s++)
            ccEvent(n[s], "click", function () {
                a.select(this);
            });
        0 === this.searchResults.results.length ? (this.info("no-results"), (this.hasContent = !1)) : (this.hasContent = !0);
    }),
    (clickToAddress.prototype.showResultsExtra = function () {
        "use strict";
        this.scrollPosition++;
        for (var t = this.scrollLimit * this.scrollPosition, e = "", i = this.searchResults.results.length - t, s = 0; s < i && s < this.scrollLimit; s++) e += "<li></li>";
        this.resultList.innerHTML += e;
        for (var n = this.resultList.getElementsByTagName("li"), a = this, s = t; s < n.length; s++) {
            var o = JSON.parse(JSON.stringify(this.searchResults.results[s])),
                r = o.labels.join(", ");
            if (a.transliterate && "function" == typeof a.transl) for (var l = 0; l < o.labels.length; l++) o.labels[l] = a.transl(o.labels[l]);
            var c = "<div>";
            if (
                ("string" == typeof o.labels[0] && "" !== o.labels[0] && (c += "<span>" + o.labels[0] + "</span>"),
                "string" == typeof o.labels[1] && "" !== o.labels[1] && (c += '<span class="light">' + o.labels[1] + "</span>"),
                "number" == typeof o.count && o.count > 1 && (c += '<span class="light">(' + o.count + " more)</span>"),
                (c += "</div>"),
                (n[s].innerHTML = c),
                n[s].setAttribute("title", r),
                void 0 === o.count || void 0 === o.id)
            )
                throw "server error";
            ccData(n[s], "id", o.id.toString()), ccData(n[s], "count", o.count.toString()), 1 != o.count && (n[s].className = "cc-filter");
        }
        for (var s = 0; s < n.length; s++)
            ccEvent(n[s], "click", function () {
                a.select(this);
            });
    }),
    (clickToAddress.prototype.select = function (t) {
        "use strict";
        if ((this.resetSelector(), this.cleanHistory(), (t.id = ccData(t, "id")), (t.count = ccData(t, "count")), "1" === t.count)) return this.getAddressDetails(t.id), this.hide(), void this.loseFocus();
        if ("1" !== t.count) {
            this.sequence++, (this.searchStatus.lastSearchId = this.sequence);
            var e = this.sequence;
            return this.search(this.activeInput.value, t.id, e), this.getFocus(), void (this.activeId = t.id);
        }
        return "deadend" != t.className ? (this.sequence++, (this.searchStatus.lastSearchId = this.sequence), this.search(this.activeInput.value), void this.getFocus()) : void 0;
    }),
    (clickToAddress.prototype.getGeo = function () {
        "use strict";
        var t = this;
        navigator.geolocation &&
            navigator.geolocation.getCurrentPosition(function (e) {
                (t.coords = e.coords), t.showGeo();
            });
    }),
    (clickToAddress.prototype.changeCountry = function (t) {
        "use strict";
        this.hideHistory(), this.resetSelector();
        for (var e = "", i = this.validCountries.length, s = 0; s < i; s++) e += "<li></li>";
        this.resultList.innerHTML = e;
        var n = this.resultList.getElementsByTagName("li");
        this.resultList.scrollTop = 0;
        for (var a = this, o = 0, s = 0; s < n.length; s++) {
            var r = this.validCountries[s + o],
                l = "";
            if (void 0 !== t && "" !== t) {
                for (var c = !1, h = 0; !c && h < Object.keys(r).length; h++) {
                    var d = r[Object.keys(r)[h]];
                    if ("object" == typeof d && Array.isArray(d))
                        for (var u = 0; !c && u < d.length; u++) {
                            var p = d[u].toString().toLowerCase();
                            0 === p.indexOf(t.toLowerCase()) && (c = !0);
                        }
                    else {
                        var p = d.toString().toLowerCase();
                        0 === p.indexOf(t.toLowerCase()) && (c = !0);
                    }
                }
                c ? (l = '<span class="cc-flag cc-flag-' + r.short_code + '"></span><span>' + r.country_name + "</span>") : (n[s].parentNode.removeChild(n[s]), s--, o++);
            } else var l = '<span class="cc-flag cc-flag-' + r.short_code + '"></span><span>' + r.country_name + "</span>";
            "" != l &&
                ((n[s].innerHTML = l),
                n[s].setAttribute("countryCode", r.code),
                (a.hasContent = !0),
                ccEvent(n[s], "click", function () {
                    a.selectCountry(this.getAttribute("countryCode"));
                }));
        }
        (this.searchStatus.inCountryMode = 1), this.getFocus();
    }),
    (clickToAddress.prototype.selectCountry = function (t, e) {
        "use strict";
        var e = e || !1,
            i = this;
        this.clear();
        var s = {};
        this.activeCountryId = 0;
        for (var n = 0; n < this.validCountries.length; n++)
            if (this.validCountries[n].code == t) {
                this.activeCountryId = n;
                break;
            }
        if (((s = this.validCountries[this.activeCountryId]), "hidden" !== this.countrySelectorOption)) {
            this.searchObj.getElementsByClassName("country_img")[0].setAttribute("class", "country_img cc-flag cc-flag-" + s.short_code),
                "disabled" == this.countrySelectorOption && (this.searchObj.getElementsByClassName("country_btn")[0].getElementsByTagName("span")[0].innerHTML = s.country_name);
        }
        if (((this.activeCountry = t), (i.searchStatus.inCountryMode = 0), this.getFocus(), !e && void 0 !== this.activeInput.value && "" != typeof this.lastSearch)) {
            (this.activeInput.value = this.lastSearch), (this.activeId = ""), this.sequence++, (this.searchStatus.lastSearchId = this.sequence);
            var a = this.sequence;
            setTimeout(function () {
                i.searchStatus.lastSearchId <= a && ("" !== i.activeInput.value ? (i.search(i.activeInput.value, i.activeId, a), i.cleanHistory()) : i.clear());
            }, 200),
                this.gfxModeTools.reposition(this, this.activeInput);
        }
        this.setHistoryStep(), this.setPlaceholder(0);
    }),
    (clickToAddress.prototype.setCountryChange = function () {
        "use strict";
        var t = [];
        if (0 !== this.enabledCountries.length) {
            for (var e = 0; e < this.enabledCountries.length; e++) {
                for (var i = this.enabledCountries[e], s = null, n = [], a = 0; a < this.validCountries.length; a++)
                    if (-1 === t.indexOf(a)) {
                        var o = this.validCountries[a];
                        switch (this.countryMatchWith) {
                            case "iso_3":
                                i == o.iso_3166_1_alpha_3 && (s = a);
                                break;
                            case "iso_2":
                                i == o.iso_3166_1_alpha_2 && (s = a);
                                break;
                            case "code":
                                var r = [o.code.toUpperCase(), o.short_code.toUpperCase()];
                                -1 !== r.indexOf(i) && (s = a);
                                break;
                            default:
                                this.error("JS401");
                            case "text":
                                for (var l = 0; !s && l < Object.keys(o).length; l++) {
                                    var c = o[Object.keys(o)[l]];
                                    if ("string" == typeof c || "number" == typeof c) {
                                        var h = c.toString().toUpperCase();
                                        0 === h.indexOf(i) && (h == i ? (s = a) : -1 == n.indexOf(a) && n.push(a));
                                    } else
                                        for (var d = 0; d < c.length; d++) {
                                            var h = c[d].toString().toUpperCase();
                                            0 === h.indexOf(i) && (h == i ? (s = a) : -1 == n.indexOf(a) && n.push(a));
                                        }
                                }
                        }
                    }
                if (null !== s) t.push(s);
                else if (n.length > 0) for (var u = 0; u < n.length; u++) t.push(n[u]);
                (s = null), (n = []);
            }
            for (var p = 0, a = 0; a < this.validCountries.length; a++) -1 == t.indexOf(a + p) && (this.validCountries.splice(a, 1), p++, a--);
        }
        if (0 === this.validCountries.length) throw "No valid countries left in the country list!";
        if ("enabled" == this.countrySelectorOption) {
            var f = this.searchObj.getElementsByClassName("country_btn")[0],
                m = this;
            ccEvent(f, "click", function () {
                0 === m.searchStatus.inCountryMode
                    ? (m.setPlaceholder(1), m.changeCountry(), (m.activeInput.value = ""), (m.hasContent = !0), m.info())
                    : (m.setPlaceholder(0), (m.searchStatus.inCountryMode = 0), m.hide(!0), m.getFocus(), (m.hover = !0));
            });
        }
    }),
    void 0 === c2a_gfx_modes)
)
    var c2a_gfx_modes = {};
if (
    ((c2a_gfx_modes.mode1 = {
        addHtml: function (t) {
            var e = document.createElement("DIV");
            (e.className = "c2a_mode" + t.gfxMode + " c2a_" + t.style.ambient + " c2a_accent_" + t.style.accent), (e.id = "cc_c2a");
            var i = '<div class="cc-history"><div class="cc-back cc-disabled"></div>';
            i += '<div class="cc-forward cc-disabled"></div></div>';
            var s = "";
            if ("hidden" != t.countrySelectorOption || t.historyTools) {
                if (((s += '<div class="mainbar">'), "hidden" != t.countrySelectorOption)) {
                    var n = "country_btn";
                    "enabled" == t.countrySelectorOption && (n += " country_btn_active"), (s += '<div class="' + n + '"><div class="country_img"></div><span>' + t.texts.country_button + "</span></div>");
                }
                t.historyTools && (s += i), t.showLogo && (s += '<div class="c2a_logo" title="Provided by Crafty Clicks"></div>'), (s += "</div>");
            }
            var a = '<div class="progressBar"></div>' + s + '<div class="infoBar"></div>',
                o = '<div class="c2a_error"></div><ul class="c2a_results"></ul><div class="c2a_footer">' + a + "</div>";
            (e.innerHTML = o), document.body.appendChild(e);
        },
        reposition: function (t, e) {
            var i = e.getBoundingClientRect(),
                s = document.documentElement,
                n = (window.pageYOffset || s.scrollTop) - (s.clientTop || 0),
                a = (window.pageXOffset || s.scrollLeft) - (s.clientLeft || 0),
                o = i.top + n + (e.offsetHeight - 1),
                r = i.left + a + 3,
                l = window.getComputedStyle(document.getElementsByTagName("html")[0]);
            (o += parseInt(l.getPropertyValue("margin-top")) + parseInt(l.getPropertyValue("padding-top"))),
                (r += parseInt(l.getPropertyValue("margin-left")) + parseInt(l.getPropertyValue("padding-left"))),
                (t.searchObj.style.left = r + "px"),
                (t.searchObj.style.top = o + "px"),
                (t.searchObj.style.width = e.offsetWidth - 6 + "px");
            var c = t.searchObj.getElementsByClassName("c2a_logo");
            c.length && (i.width < 300 ? t.tools.addClass(c[0], "hidden") : t.tools.hasClass(c[0], "tools_in_use") || t.tools.removeClass(c[0], "hidden"));
            e.cc_current_target = 1;
            for (var h = document.getElementsByClassName("c2a_active"), d = 0; d < h.length; d++) void 0 === h[d].cc_current_target && (h[d].className = h[d].className.replace(" c2a_active", ""));
            delete e.cc_current_target, -1 == e.className.indexOf("c2a_active") && (e.className += " c2a_active");
        },
    }),
    void 0 === c2a_gfx_modes)
)
    var c2a_gfx_modes = {};
if (
    ((c2a_gfx_modes.mode2 = {
        addHtml: function (t) {
            var e = document.createElement("DIV");
            (e.className = "c2a_mode" + t.gfxMode + " c2a_" + t.style.ambient + " c2a_accent_" + t.style.accent), (e.id = "cc_c2a");
            var i = "";
            if ("hidden" != t.countrySelectorOption || t.historyTools) {
                if (((i += '<div class="mainbar">'), "hidden" != t.countrySelectorOption)) {
                    var s = "country_btn";
                    "enabled" == t.countrySelectorOption && (s += " country_btn_active"), (i += '<div class="' + s + '"><div class="country_img"></div><span>' + t.texts.country_button + "</span></div>");
                }
                t.historyTools && ((i += '<div class="cc-history"><div class="cc-back disabled"></div>'), (i += '<div class="cc-forward disabled"></div></div>')),
                    t.showLogo && (i += '<div class="c2a_logo" title="Provided by Crafty Clicks"></div>'),
                    (i += "</div>");
            }
            var n = i + '<div class="c2a_error"></div><ul class="c2a_results"></ul><div class="c2a_footer"><div class="progressBar"></div><div class="infoBar"></div></div>';
            (e.innerHTML = n), document.body.appendChild(e);
        },
        reposition: function (t, e) {
            var i = e.getBoundingClientRect(),
                s = document.documentElement,
                n = (window.pageYOffset || s.scrollTop) - (s.clientTop || 0),
                a = (window.pageXOffset || s.scrollLeft) - (s.clientLeft || 0),
                o = 0;
            t.searchObj.getElementsByClassName("mainbar").length && (o = t.searchObj.getElementsByClassName("mainbar")[0].clientHeight);
            var r = i.top + n - (o + 6),
                l = i.left + a,
                c = window.getComputedStyle(document.getElementsByTagName("html")[0]);
            (r += parseInt(c.getPropertyValue("margin-top")) + parseInt(c.getPropertyValue("padding-top"))),
                (l += parseInt(c.getPropertyValue("margin-left")) + parseInt(c.getPropertyValue("padding-left"))),
                (t.searchObj.style.left = l - 5 + "px"),
                (t.searchObj.style.top = r + "px"),
                (t.searchObj.style.width = e.offsetWidth + 10 + "px"),
                t.searchObj.getElementsByClassName("c2a_results").length && (t.searchObj.getElementsByClassName("c2a_results")[0].style.marginTop = e.offsetHeight + 6 + "px");
            var h = t.searchObj.getElementsByClassName("c2a_logo");
            h.length && (i.width < 300 ? t.tools.addClass(h[0], "hidden") : t.tools.hasClass(h[0], "tools_in_use") || t.tools.removeClass(h[0], "hidden"));
            e.cc_current_target = 1;
            for (var d = document.getElementsByClassName("c2a_active"), u = 0; u < d.length; u++) void 0 === d[u].cc_current_target && (d[u].className = d[u].className.replace(" c2a_active", ""));
            delete e.cc_current_target, -1 == e.className.indexOf("c2a_active") && (e.className += " c2a_active");
        },
    }),
    void 0 === c2a_gfx_modes)
)
    var c2a_gfx_modes = {};
(c2a_gfx_modes.mode3 = {
    addHtml: function (t) {
        var e = document.createElement("DIV");
        (e.className = "c2a_mode" + t.gfxMode + " c2a_" + t.style.ambient + " c2a_accent_" + t.style.accent), (e.id = "cc_c2a");
        var i = '<div class="cc-history"><div class="cc-back cc-disabled"></div>';
        i += '<div class="cc-forward cc-disabled"></div></div>';
        var s = "";
        if ("hidden" != t.countrySelectorOption || t.historyTools) {
            if (((s += '<div class="mainbar">'), "hidden" != t.countrySelectorOption)) {
                var n = "country_btn";
                "enabled" == t.countrySelectorOption && (n += " country_btn_active"), (s += '<div class="' + n + '"><div class="country_img"></div><span>' + t.texts.country_button + "</span></div>");
            }
            t.historyTools && (s += i), t.showLogo && (s += '<div class="c2a_logo" title="Provided by Crafty Clicks"></div>'), (s += "</div>");
        }
        var a = '<div class="progressBar"></div>' + s + '<div class="infoBar"></div>',
            o = '<div class="c2a_error"></div><ul class="c2a_results"></ul><div class="c2a_footer">' + a + "</div>";
        (e.innerHTML = o), document.body.appendChild(e);
    },
    reposition: function (t, e) {
        var i = e.getBoundingClientRect(),
            s = document.documentElement,
            n = (window.pageYOffset || s.scrollTop) - (s.clientTop || 0),
            a = (window.pageXOffset || s.scrollLeft) - (s.clientLeft || 0),
            o = i.top + n + (e.offsetHeight + 3),
            r = i.left + a,
            l = window.getComputedStyle(document.getElementsByTagName("html")[0]);
        (o += parseInt(l.getPropertyValue("margin-top")) + parseInt(l.getPropertyValue("padding-top"))),
            (r += parseInt(l.getPropertyValue("margin-left")) + parseInt(l.getPropertyValue("padding-left"))),
            (t.searchObj.style.left = r + "px"),
            (t.searchObj.style.top = o + "px"),
            (t.searchObj.style.width = e.offsetWidth + "px");
        var c = t.searchObj.getElementsByClassName("c2a_logo");
        c.length && (i.width < 300 ? t.tools.addClass(c[0], "hidden") : t.tools.hasClass(c[0], "tools_in_use") || t.tools.removeClass(c[0], "hidden"));
        e.cc_current_target = 1;
        for (var h = document.getElementsByClassName("c2a_active"), d = 0; d < h.length; d++) void 0 === h[d].cc_current_target && (h[d].className = h[d].className.replace(" c2a_active", ""));
        delete e.cc_current_target, -1 == e.className.indexOf("c2a_active") && (e.className += " c2a_active");
    },
}),
    (clickToAddress.prototype.setupText = function (t) {
        "use strict";
        if (
            ((this.texts = {
                default_placeholder: "Start with post/zip code or street",
                country_placeholder: "Type here to search for a country",
                country_button: "Change Country",
                generic_error: "Service unavailable.</br>Please enter your address manually.",
                no_results: "No results found",
                more: "({{value}} more)",
            }),
            void 0 !== t)
        )
            for (var e = Object.keys(this.texts), i = 0; i < e.length; i++) void 0 !== t[e[i]] && "" !== t[e[i]] && (this.texts[e[i]] = t[e[i]]);
    }),
    (clickToAddress.prototype.setCfg = function (t, e, i, s) {
        "use strict";
        (i = i || !1), (s = s || !1), s || (s = e), void 0 !== t[s] && "" !== t[s] ? (this[e] = t[s]) : (this[e] = i);
    }),
    (clickToAddress.prototype.getCfg = function (t) {
        return void 0 !== this.activeDom.config && void 0 !== this.activeDom.config[t] ? this.activeDom.config[t] : this[t];
    }),
    (clickToAddress.prototype.preset = function (t) {
        "use strict";
        if (
            ((this.jsVersion = "1.1.10"),
            (this.serviceReady = 0),
            (this.debug = !1),
            (this.activeCountry = ""),
            (this.hover = !1),
            (this.visible = !1),
            (this.focused = !1),
            (this.hasContent = !1),
            (this.keyboardHideInProgress = !1),
            (this.coords = 0),
            (this.activeDom = {}),
            (this.domLib = []),
            (this.searchResults = {}),
            (this.searchObj = {}),
            (this.selectorPos = -1),
            (this.activeInput = "init"),
            (this.searchStatus = { lastSearchId: 0, lastResponseId: 0, inCountryMode: 0 }),
            (this.sequence = 0),
            (this.cache = { finds: {}, retrieves: {} }),
            (this.cachePos = -1),
            (this.scrollPosition = 0),
            (this.scrollLimit = 20),
            (this.activeId = ""),
            (this.lastSearch = ""),
            (this.funcStore = {}),
            (this.transl = null),
            (this.lastSearchCompanyValue = ""),
            this.setCfg(t, "gfxMode", 1),
            this.setCfg(t, "baseURL", "https://api.craftyclicks.co.uk/address/1.1", "relay"),
            "/" != this.baseURL[this.baseURL.length] && (this.baseURL += "/"),
            this.setCfg(t, "key", "", "accessToken"),
            this.setCfg(t, "defaultCountry", "gbr"),
            this.setCfg(t, "enabledCountries", []),
            this.enabledCountries.length)
        )
            for (var e = 0; e < this.enabledCountries.length; e++) this.enabledCountries[e] = this.enabledCountries[e].toUpperCase();
        this.setCfg(t, "style", { ambient: "light", accent: "default" }),
            -1 == ["light", "dark", "custom"].indexOf(this.style.ambient) && (this.style.ambient = "light"),
            -1 ==
                ["default", "red", "pink", "purple", "deepPurple", "indigo", "blue", "lightBlue", "cyan", "teal", "green", "lightGreen", "lime", "yellow", "amber", "orange", "deepOrange", "brown", "grey", "blueGrey", "custom"].indexOf(
                    this.style.accent
                ) && (this.style.accent = "default"),
            this.setCfg(t, "domMode", "name"),
            this.setCfg(t, "placeholders", !0),
            this.setCfg(t, "onResultSelected"),
            this.setCfg(t, "onCountryChange"),
            this.setCfg(t, "onSearchFocus"),
            this.setCfg(t, "onSetCounty"),
            this.setCfg(t, "onError"),
            this.setCfg(t, "historyTools", !0),
            1 === this.enabledCountries.length ? (this.setCfg(t, "countrySelector", !1), this.setCfg(t, "countrySelectorOption", "disabled")) : (this.setCfg(t, "countrySelector", !0), this.setCfg(t, "countrySelectorOption", "enabled")),
            void 0 === t.countrySelectorOption && void 0 !== t.countrySelector && (this.countrySelector ? (this.countrySelectorOption = "enabled") : (this.countrySelectorOption = "disabled")),
            this.setCfg(t, "showLogo", !0),
            this.setCfg(t, "getIpLocation", !0),
            this.setCfg(t, "accessTokenOverride", {}),
            this.setupText(t.texts),
            this.setCfg(t, "countryLanguage", "en"),
            this.setCfg(t, "countryMatchWith", "iso_3"),
            this.setCfg(t, "tag", ""),
            this.setCfg(t, "cssPath", "https://cc-cdn.com/generic/styles/v1/cc_c2a.min.css"),
            this.setCfg(t, "disableAutoSearch", !1),
            this.setCfg(t, "transliterate", !1),
            this.setCfg(t, "debug", !1),
            this.setCfg(t, "customParameters", {}),
            this.setFingerPrint();
    }),
    (clickToAddress.prototype.tools = {});
var defaultDiacriticsRemovalMap = [
    { base: "A", letters: /[\u0041\u24B6\uFF21\u00C0\u00C1\u00C2\u1EA6\u1EA4\u1EAA\u1EA8\u00C3\u0100\u0102\u1EB0\u1EAE\u1EB4\u1EB2\u0226\u01E0\u00C4\u01DE\u1EA2\u00C5\u01FA\u01CD\u0200\u0202\u1EA0\u1EAC\u1EB6\u1E00\u0104\u023A\u2C6F]/g },
    { base: "AA", letters: /[\uA732]/g },
    { base: "AE", letters: /[\u00C6\u01FC\u01E2]/g },
    { base: "AO", letters: /[\uA734]/g },
    { base: "AU", letters: /[\uA736]/g },
    { base: "AV", letters: /[\uA738\uA73A]/g },
    { base: "AY", letters: /[\uA73C]/g },
    { base: "B", letters: /[\u0042\u24B7\uFF22\u1E02\u1E04\u1E06\u0243\u0182\u0181]/g },
    { base: "C", letters: /[\u0043\u24B8\uFF23\u0106\u0108\u010A\u010C\u00C7\u1E08\u0187\u023B\uA73E]/g },
    { base: "D", letters: /[\u0044\u24B9\uFF24\u1E0A\u010E\u1E0C\u1E10\u1E12\u1E0E\u0110\u018B\u018A\u0189\uA779]/g },
    { base: "DZ", letters: /[\u01F1\u01C4]/g },
    { base: "Dz", letters: /[\u01F2\u01C5]/g },
    { base: "E", letters: /[\u0045\u24BA\uFF25\u00C8\u00C9\u00CA\u1EC0\u1EBE\u1EC4\u1EC2\u1EBC\u0112\u1E14\u1E16\u0114\u0116\u00CB\u1EBA\u011A\u0204\u0206\u1EB8\u1EC6\u0228\u1E1C\u0118\u1E18\u1E1A\u0190\u018E]/g },
    { base: "F", letters: /[\u0046\u24BB\uFF26\u1E1E\u0191\uA77B]/g },
    { base: "G", letters: /[\u0047\u24BC\uFF27\u01F4\u011C\u1E20\u011E\u0120\u01E6\u0122\u01E4\u0193\uA7A0\uA77D\uA77E]/g },
    { base: "H", letters: /[\u0048\u24BD\uFF28\u0124\u1E22\u1E26\u021E\u1E24\u1E28\u1E2A\u0126\u2C67\u2C75\uA78D]/g },
    { base: "I", letters: /[\u0049\u24BE\uFF29\u00CC\u00CD\u00CE\u0128\u012A\u012C\u0130\u00CF\u1E2E\u1EC8\u01CF\u0208\u020A\u1ECA\u012E\u1E2C\u0197]/g },
    { base: "J", letters: /[\u004A\u24BF\uFF2A\u0134\u0248]/g },
    { base: "K", letters: /[\u004B\u24C0\uFF2B\u1E30\u01E8\u1E32\u0136\u1E34\u0198\u2C69\uA740\uA742\uA744\uA7A2]/g },
    { base: "L", letters: /[\u004C\u24C1\uFF2C\u013F\u0139\u013D\u1E36\u1E38\u013B\u1E3C\u1E3A\u0141\u023D\u2C62\u2C60\uA748\uA746\uA780]/g },
    { base: "LJ", letters: /[\u01C7]/g },
    { base: "Lj", letters: /[\u01C8]/g },
    { base: "M", letters: /[\u004D\u24C2\uFF2D\u1E3E\u1E40\u1E42\u2C6E\u019C]/g },
    { base: "N", letters: /[\u004E\u24C3\uFF2E\u01F8\u0143\u00D1\u1E44\u0147\u1E46\u0145\u1E4A\u1E48\u0220\u019D\uA790\uA7A4]/g },
    { base: "NJ", letters: /[\u01CA]/g },
    { base: "Nj", letters: /[\u01CB]/g },
    {
        base: "O",
        letters: /[\u004F\u24C4\uFF2F\u00D2\u00D3\u00D4\u1ED2\u1ED0\u1ED6\u1ED4\u00D5\u1E4C\u022C\u1E4E\u014C\u1E50\u1E52\u014E\u022E\u0230\u00D6\u022A\u1ECE\u0150\u01D1\u020C\u020E\u01A0\u1EDC\u1EDA\u1EE0\u1EDE\u1EE2\u1ECC\u1ED8\u01EA\u01EC\u00D8\u01FE\u0186\u019F\uA74A\uA74C]/g,
    },
    { base: "OI", letters: /[\u01A2]/g },
    { base: "OO", letters: /[\uA74E]/g },
    { base: "OU", letters: /[\u0222]/g },
    { base: "P", letters: /[\u0050\u24C5\uFF30\u1E54\u1E56\u01A4\u2C63\uA750\uA752\uA754]/g },
    { base: "Q", letters: /[\u0051\u24C6\uFF31\uA756\uA758\u024A]/g },
    { base: "R", letters: /[\u0052\u24C7\uFF32\u0154\u1E58\u0158\u0210\u0212\u1E5A\u1E5C\u0156\u1E5E\u024C\u2C64\uA75A\uA7A6\uA782]/g },
    { base: "S", letters: /[\u0053\u24C8\uFF33\u1E9E\u015A\u1E64\u015C\u1E60\u0160\u1E66\u1E62\u1E68\u0218\u015E\u2C7E\uA7A8\uA784]/g },
    { base: "T", letters: /[\u0054\u24C9\uFF34\u1E6A\u0164\u1E6C\u021A\u0162\u1E70\u1E6E\u0166\u01AC\u01AE\u023E\uA786]/g },
    { base: "TZ", letters: /[\uA728]/g },
    { base: "U", letters: /[\u0055\u24CA\uFF35\u00D9\u00DA\u00DB\u0168\u1E78\u016A\u1E7A\u016C\u00DC\u01DB\u01D7\u01D5\u01D9\u1EE6\u016E\u0170\u01D3\u0214\u0216\u01AF\u1EEA\u1EE8\u1EEE\u1EEC\u1EF0\u1EE4\u1E72\u0172\u1E76\u1E74\u0244]/g },
    { base: "V", letters: /[\u0056\u24CB\uFF36\u1E7C\u1E7E\u01B2\uA75E\u0245]/g },
    { base: "VY", letters: /[\uA760]/g },
    { base: "W", letters: /[\u0057\u24CC\uFF37\u1E80\u1E82\u0174\u1E86\u1E84\u1E88\u2C72]/g },
    { base: "X", letters: /[\u0058\u24CD\uFF38\u1E8A\u1E8C]/g },
    { base: "Y", letters: /[\u0059\u24CE\uFF39\u1EF2\u00DD\u0176\u1EF8\u0232\u1E8E\u0178\u1EF6\u1EF4\u01B3\u024E\u1EFE]/g },
    { base: "Z", letters: /[\u005A\u24CF\uFF3A\u0179\u1E90\u017B\u017D\u1E92\u1E94\u01B5\u0224\u2C7F\u2C6B\uA762]/g },
    {
        base: "a",
        letters: /[\u0061\u24D0\uFF41\u1E9A\u00E0\u00E1\u00E2\u1EA7\u1EA5\u1EAB\u1EA9\u00E3\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\u00E4\u01DF\u1EA3\u00E5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250]/g,
    },
    { base: "aa", letters: /[\uA733]/g },
    { base: "ae", letters: /[\u00E6\u01FD\u01E3]/g },
    { base: "ao", letters: /[\uA735]/g },
    { base: "au", letters: /[\uA737]/g },
    { base: "av", letters: /[\uA739\uA73B]/g },
    { base: "ay", letters: /[\uA73D]/g },
    { base: "b", letters: /[\u0062\u24D1\uFF42\u1E03\u1E05\u1E07\u0180\u0183\u0253]/g },
    { base: "c", letters: /[\u0063\u24D2\uFF43\u0107\u0109\u010B\u010D\u00E7\u1E09\u0188\u023C\uA73F\u2184]/g },
    { base: "d", letters: /[\u0064\u24D3\uFF44\u1E0B\u010F\u1E0D\u1E11\u1E13\u1E0F\u0111\u018C\u0256\u0257\uA77A]/g },
    { base: "dz", letters: /[\u01F3\u01C6]/g },
    { base: "e", letters: /[\u0065\u24D4\uFF45\u00E8\u00E9\u00EA\u1EC1\u1EBF\u1EC5\u1EC3\u1EBD\u0113\u1E15\u1E17\u0115\u0117\u00EB\u1EBB\u011B\u0205\u0207\u1EB9\u1EC7\u0229\u1E1D\u0119\u1E19\u1E1B\u0247\u025B\u01DD]/g },
    { base: "f", letters: /[\u0066\u24D5\uFF46\u1E1F\u0192\uA77C]/g },
    { base: "g", letters: /[\u0067\u24D6\uFF47\u01F5\u011D\u1E21\u011F\u0121\u01E7\u0123\u01E5\u0260\uA7A1\u1D79\uA77F]/g },
    { base: "h", letters: /[\u0068\u24D7\uFF48\u0125\u1E23\u1E27\u021F\u1E25\u1E29\u1E2B\u1E96\u0127\u2C68\u2C76\u0265]/g },
    { base: "hv", letters: /[\u0195]/g },
    { base: "i", letters: /[\u0069\u24D8\uFF49\u00EC\u00ED\u00EE\u0129\u012B\u012D\u00EF\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131]/g },
    { base: "j", letters: /[\u006A\u24D9\uFF4A\u0135\u01F0\u0249]/g },
    { base: "k", letters: /[\u006B\u24DA\uFF4B\u1E31\u01E9\u1E33\u0137\u1E35\u0199\u2C6A\uA741\uA743\uA745\uA7A3]/g },
    { base: "l", letters: /[\u006C\u24DB\uFF4C\u0140\u013A\u013E\u1E37\u1E39\u013C\u1E3D\u1E3B\u017F\u0142\u019A\u026B\u2C61\uA749\uA781\uA747]/g },
    { base: "lj", letters: /[\u01C9]/g },
    { base: "m", letters: /[\u006D\u24DC\uFF4D\u1E3F\u1E41\u1E43\u0271\u026F]/g },
    { base: "n", letters: /[\u006E\u24DD\uFF4E\u01F9\u0144\u00F1\u1E45\u0148\u1E47\u0146\u1E4B\u1E49\u019E\u0272\u0149\uA791\uA7A5]/g },
    { base: "nj", letters: /[\u01CC]/g },
    {
        base: "o",
        letters: /[\u006F\u24DE\uFF4F\u00F2\u00F3\u00F4\u1ED3\u1ED1\u1ED7\u1ED5\u00F5\u1E4D\u022D\u1E4F\u014D\u1E51\u1E53\u014F\u022F\u0231\u00F6\u022B\u1ECF\u0151\u01D2\u020D\u020F\u01A1\u1EDD\u1EDB\u1EE1\u1EDF\u1EE3\u1ECD\u1ED9\u01EB\u01ED\u00F8\u01FF\u0254\uA74B\uA74D\u0275]/g,
    },
    { base: "oi", letters: /[\u01A3]/g },
    { base: "ou", letters: /[\u0223]/g },
    { base: "oo", letters: /[\uA74F]/g },
    { base: "p", letters: /[\u0070\u24DF\uFF50\u1E55\u1E57\u01A5\u1D7D\uA751\uA753\uA755]/g },
    { base: "q", letters: /[\u0071\u24E0\uFF51\u024B\uA757\uA759]/g },
    { base: "r", letters: /[\u0072\u24E1\uFF52\u0155\u1E59\u0159\u0211\u0213\u1E5B\u1E5D\u0157\u1E5F\u024D\u027D\uA75B\uA7A7\uA783]/g },
    { base: "s", letters: /[\u0073\u24E2\uFF53\u00DF\u015B\u1E65\u015D\u1E61\u0161\u1E67\u1E63\u1E69\u0219\u015F\u023F\uA7A9\uA785\u1E9B]/g },
    { base: "t", letters: /[\u0074\u24E3\uFF54\u1E6B\u1E97\u0165\u1E6D\u021B\u0163\u1E71\u1E6F\u0167\u01AD\u0288\u2C66\uA787]/g },
    { base: "tz", letters: /[\uA729]/g },
    { base: "u", letters: /[\u0075\u24E4\uFF55\u00F9\u00FA\u00FB\u0169\u1E79\u016B\u1E7B\u016D\u00FC\u01DC\u01D8\u01D6\u01DA\u1EE7\u016F\u0171\u01D4\u0215\u0217\u01B0\u1EEB\u1EE9\u1EEF\u1EED\u1EF1\u1EE5\u1E73\u0173\u1E77\u1E75\u0289]/g },
    { base: "v", letters: /[\u0076\u24E5\uFF56\u1E7D\u1E7F\u028B\uA75F\u028C]/g },
    { base: "vy", letters: /[\uA761]/g },
    { base: "w", letters: /[\u0077\u24E6\uFF57\u1E81\u1E83\u0175\u1E87\u1E85\u1E98\u1E89\u2C73]/g },
    { base: "x", letters: /[\u0078\u24E7\uFF58\u1E8B\u1E8D]/g },
    { base: "y", letters: /[\u0079\u24E8\uFF59\u1EF3\u00FD\u0177\u1EF9\u0233\u1E8F\u00FF\u1EF7\u1E99\u1EF5\u01B4\u024F\u1EFF]/g },
    { base: "z", letters: /[\u007A\u24E9\uFF5A\u017A\u1E91\u017C\u017E\u1E93\u1E95\u01B6\u0225\u0240\u2C6C\uA763]/g },
];
if (
    ((clickToAddress.prototype.tools.addClass = function (t, e) {
        var i = t.className.split(" ");
        -1 == i.indexOf(e) && i.push(e), (t.className = i.join(" "));
    }),
    (clickToAddress.prototype.tools.removeClass = function (t, e) {
        for (var i = t.className.split(" "), s = 0; s < i.length; s++) i[s] == e && (i.splice(s, 1), s--);
        t.className = i.join(" ");
    }),
    (clickToAddress.prototype.tools.hasClass = function (t, e) {
        for (var i = t.className.split(" "), s = 0; s < i.length; s++) if (i[s] == e) return !0;
        return !1;
    }),
    (clickToAddress.prototype.addTransl = function () {
        var t = this,
            e = "https://cc-cdn.com/utils/transl/v1.6.2/transliteration.min.js";
        try {
            if ("function" == typeof define && define.amd)
                requirejs.config({ paths: { transliterate: [e] } }),
                    require(["transliterate"], function (e) {
                        t.transl = e;
                    });
            else {
                var i = "crafty_transliterate";
                if (null === document.getElementById("crafty_transliterate")) {
                    if (!document.getElementById(i)) {
                        var s = document.getElementsByTagName("head")[0],
                            n = document.createElement("script");
                        (n.id = i), (n.type = "text/javascript"), (n.src = e), s.appendChild(n);
                    }
                    var a = function () {
                            "function" == typeof transl && (clearInterval(o), (t.transl = transl));
                        },
                        o = setInterval(a, 250);
                }
            }
        } catch (t) {}
    }),
    (clickToAddress.prototype.setPlaceholder = function (t, e) {
        "use strict";
        if (("init" != this.activeInput && (e = this.activeInput), this.placeholders && void 0 !== e)) {
            var i = this.texts.default_placeholder;
            t && (i = this.texts.country_placeholder), e.setAttribute("placeholder", i);
        }
    }),
    (clickToAddress.prototype.getFocus = function () {
        "use strict";
        "init" != this.activeInput && this.activeInput.focus(), (this.focused = !0);
    }),
    (clickToAddress.prototype.loseFocus = function () {
        "use strict";
        "init" != this.activeInput && this.activeInput.blur(), (this.focused = !1);
    }),
    (clickToAddress.prototype.clear = function () {
        "use strict";
        (this.resultList.innerHTML = ""), (this.searchStatus = { lastSearchId: 0, lastResponseId: 0, inCountryMode: 0 });
    }),
    (clickToAddress.prototype.show = function () {
        "use strict";
        (this.searchObj.style.display = "block"), (this.visible = !0), this.setHistoryStep(), "init" != this.activeInput && this.activeInput.setAttribute("autocomplete", "off");
    }),
    (clickToAddress.prototype.hide = function (t) {
        "use strict";
        if (this.keyboardHideInProgress) return void (this.keyboardHideInProgress = !1);
        (t || (this.visible && !this.focused && !this.hover)) &&
            ((this.searchObj.style.display = "none"),
            (this.visible = !1),
            (this.hover = !1),
            this.searchStatus.inCountryMode && void 0 !== this.lastSearch && (this.activeInput.value = this.lastSearch),
            this.clear(),
            (this.cachePos = -1),
            this.resetSelector(),
            this.setPlaceholder(0),
            "init" != this.activeInput && ((this.activeInput.className = this.activeInput.className.replace(" c2a_active", "")), this.activeInput.setAttribute("autocomplete", "on"))),
            this.hideErrors();
    }),
    (clickToAddress.prototype.attach = function (t, e) {
        "use strict";
        var e = e || {},
            i = {},
            s = ["search", "postcode", "town", "line_1", "line_2", "company", "county", "country"],
            n = null;
        switch (this.domMode) {
            case "id":
                n = function (t, e) {
                    if ("string" == typeof t[e] && "" !== t[e]) return document.getElementById(t[e]);
                };
                break;
            case "class":
                n = function (t, e) {
                    if ("string" == typeof t[e] && "" !== t[e]) return document.getElementsByClassName(t[e])[0];
                };
                break;
            case "name":
                n = function (t, e) {
                    if ("string" == typeof t[e] && "" !== t[e]) return document.getElementsByName(t[e])[0];
                };
                break;
            case "object":
                n = function (t, e) {
                    if ("object" == typeof t[e] && null !== t[e]) return t[e];
                };
        }
        for (var a = 0; a < s.length; a++) i[s[a]] = n(t, s[a]);
        var o = i.search;
        if ("true" == o.getAttribute("cc_applied")) throw "ClickToAddress already applied to this element!";
        o.setAttribute("cc_applied", "true"), this.setPlaceholder(0, o), (i.config = e);
        var r = this.domLib.length;
        this.domLib.push(i);
        var l = this;
        ccEvent(o, "keydown", function (t) {
            if (0 !== l.serviceReady) {
                if (38 == t.keyCode || 40 == t.keyCode) {
                    if ((t.preventDefault(), !l.hasContent)) return;
                    return void l.moveSelector(40 == t.keyCode);
                }
                13 == t.keyCode && t.preventDefault();
            }
        }),
            ccEvent(o, "keyup", function (t) {
                if (0 !== l.serviceReady) {
                    if (27 == t.keyCode) return l.hide(!0), l.loseFocus(), void l.resetSelector();
                    if (-1 == [37, 38, 39, 40, 33, 34, 35, 36, 42, 44, 45, 16, 17, 18, 19, 20].indexOf(t.keyCode)) {
                        if (13 == t.keyCode) {
                            if ((t.preventDefault(), !l.hasContent || l.selectorPos < 0)) return;
                            var e = l.searchObj.getElementsByTagName("LI")[l.selectorPos];
                            return void (1 == l.searchStatus.inCountryMode ? l.selectCountry(e.getAttribute("countryCode")) : l.select(e));
                        }
                        if (1 == l.searchStatus.inCountryMode) l.changeCountry(this.value);
                        else {
                            if (l.getCfg("disableAutoSearch")) return;
                            0 !== this.value.indexOf(l.lastSearch) && (l.activeId = ""), (l.lastSearch = this.value), l.sequence++, (l.searchStatus.lastSearchId = l.sequence);
                            var i = l.sequence,
                                s = this.value;
                            setTimeout(function () {
                                l.searchStatus.lastSearchId <= i && ("" !== s ? (l.cleanHistory(), l.search(s, l.activeId, i)) : l.clear());
                            }, 200),
                                (l.activeDom = l.domLib[r]),
                                l.gfxModeTools.reposition(l, o);
                        }
                    }
                }
            }),
            ccEvent(o, "focus", function () {
                (l.activeDom = l.domLib[r]), l.onFocus(o);
            }),
            ccEvent(o, "blur", function () {
                0 !== l.serviceReady && ((l.focused = !1), l.hide());
            }),
            ccEvent(o, "c2a-search", function () {
                if ((l.show(), 1 == l.searchStatus.inCountryMode)) l.changeCountry(this.value);
                else {
                    0 !== this.value.indexOf(l.lastSearch) && (l.activeId = ""), (l.lastSearch = this.value), l.sequence++, (l.searchStatus.lastSearchId = l.sequence);
                    var t = l.sequence,
                        e = this.value;
                    setTimeout(function () {
                        l.searchStatus.lastSearchId <= t && ("" !== e ? (l.cleanHistory(), l.search(e, l.activeId, t)) : l.clear());
                    }, 200),
                        (l.activeDom = l.domLib[r]),
                        l.gfxModeTools.reposition(l, o);
                }
            }),
            o === document.activeElement && this.onFocus(o);
    }),
    (clickToAddress.prototype.onFocus = function (t) {
        "use strict";
        var e = this;
        if (0 === e.serviceReady)
            return void setTimeout(function () {
                e.onFocus(t);
            }, 250);
        var i = e.visible;
        if (((e.activeInput = t), (e.focused = !0), e.show(), e.gfxModeTools.reposition(e, t), i || ("function" == typeof e.getCfg("onSearchFocus") && e.getCfg("onSearchFocus")(e, e.activeDom)), "" !== t.value && !i)) {
            e.sequence++, (e.searchStatus.lastSearchId = e.sequence);
            var s = e.sequence;
            e.lastSearch == t.value && (s = -1), (e.lastSearch = t.value), e.search(t.value, e.activeId, s);
        }
    }),
    (clickToAddress.prototype.resetSelector = function () {
        "use strict";
        (this.hasContent = !1), (this.selectorPos = -1);
    }),
    (clickToAddress.prototype.moveSelector = function (t) {
        "use strict";
        if (this.visible) {
            var e = this.searchObj.getElementsByTagName("LI");
            t && this.selectorPos + 1 < e.length && this.selectorPos++, !t && this.selectorPos - 1 >= 0 && this.selectorPos--;
            for (var i = 0; i < e.length; i++) i != this.selectorPos ? (e[i].className = e[i].className.replace(" active", "")) : -1 == e[i].className.indexOf("active") && (e[i].className = e[i].className + " active");
            var s = 30 * (this.selectorPos + 1),
                n = this.searchObj.getElementsByTagName("UL")[0];
            s > n.offsetHeight + n.scrollTop && (n.scrollTop = s - n.offsetHeight), s <= n.scrollTop && (n.scrollTop = s - 30);
        }
    }),
    (clickToAddress.prototype.showGeo = function () {
        "use strict";
        this.searchObj.getElementsByClassName("geo")[0].style.display = "block";
    }),
    (clickToAddress.prototype.getStyleSheet = function () {
        "use strict";
        if (!1 !== this.cssPath) {
            if (!document.getElementById("crafty_css")) {
                var t = document.getElementsByTagName("head")[0],
                    e = document.createElement("link");
                (e.id = "crafty_css"), (e.rel = "stylesheet"), (e.type = "text/css"), (e.href = this.cssPath), (e.media = "all"), t.appendChild(e);
            }
        }
    }),
    (clickToAddress.prototype.setProgressBar = function (t) {
        "use strict";
        var e = this.searchObj.getElementsByClassName("progressBar")[0];
        switch (t) {
            case 0:
                (e.className = "progressBar action"),
                    (e.style.width = "50%"),
                    setTimeout(function () {
                        "progressBar action" == e.className && ((e.className = "progressBar"), (e.style.width = "0%"));
                    }, 5e3);
                break;
            case 1:
                (e.className = "progressBar finish"),
                    (e.style.width = "100%"),
                    setTimeout(function () {
                        (e.className = "progressBar"), (e.style.width = "0%");
                    }, 2e3);
        }
    }),
    (clickToAddress.prototype.triggerSearch = function (t) {
        "use strict";
        var e = this;
        if (0 === e.serviceReady)
            return void setTimeout(function () {
                e.triggerSearch(t);
            }, 250);
        var i = document.createEvent("Event");
        i.initEvent("c2a-search", !0, !0), t.dispatchEvent(i);
    }),

    $(function () {
        var t = $("[rel~=tooltip]"),
            e = !1,
            i = !1;
        t.bind("mouseenter", function () {
            if (((e = $(this)), (tip = e.attr("title")), (i = $('<div id="tooltip"></div>')), !tip || "" == tip)) return !1;
            e.removeAttr("title"), i.css("opacity", 0).html(tip).appendTo("body");
            var t = function () {
                $(window).width() < 1.5 * i.outerWidth() ? i.css("max-width", $(window).width() / 2) : i.css("max-width", 340);
                var t = e.offset().left + e.outerWidth() / 2 - i.outerWidth() / 2,
                    s = e.offset().top - i.outerHeight() - 20;
                if (
                    (t < 0 ? ((t = e.offset().left + e.outerWidth() / 2 - 20), i.addClass("left")) : i.removeClass("left"),
                    t + i.outerWidth() > $(window).width() ? ((t = e.offset().left - i.outerWidth() + e.outerWidth() / 2 + 20), i.addClass("right")) : i.removeClass("right"),
                    s < 0)
                ) {
                    var s = e.offset().top + e.outerHeight();
                    i.addClass("top");
                } else i.removeClass("top");
                i.css({ left: t, top: s }).animate({ top: "+=10", opacity: 1 }, 50);
            };
            t(), $(window).resize(t);
            var s = function () {
                i.animate({ top: "-=10", opacity: 0 }, 50, function () {
                    $(this).remove();
                }),
                    e.attr("title", tip);
            };
            e.bind("mouseleave", s), i.bind("click", s);
        });
    }),
    "undefined" == typeof jQuery)
)
    throw new Error("Kube's requires jQuery");
!(function (t) {
    var e = t.fn.jquery.split(".");
    if (1 == e[0] && e[1] < 8) throw new Error("Kube's requires at least jQuery v1.8");
})(jQuery),
    (function () {
        Function.prototype.inherits = function (t) {
            var e = function () {};
            e.prototype = t.prototype;
            var i = new e();
            for (var s in this.prototype) i[s] = this.prototype[s];
            (this.prototype = i), (this.prototype.super = t.prototype);
        };
        var t = function (t, e) {
            (e = "object" == typeof e ? e : {}),
                (this.$element = $(t)),
                (this.opts = $.extend(!0, this.defaults, $.fn[this.namespace].options, this.$element.data(), e)),
                (this.$target = "string" == typeof this.opts.target ? $(this.opts.target) : null);
        };
        (t.prototype = {
            getInstance: function () {
                return this.$element.data("fn." + this.namespace);
            },
            hasTarget: function () {
                return !(null === this.$target);
            },
            callback: function (t) {
                var e = [].slice.call(arguments).splice(1);
                return (
                    this.$element && (e = this._fireCallback($._data(this.$element[0], "events"), t, this.namespace, e)),
                    this.$target && (e = this._fireCallback($._data(this.$target[0], "events"), t, this.namespace, e)),
                    this.opts && this.opts.callbacks && $.isFunction(this.opts.callbacks[t]) ? this.opts.callbacks[t].apply(this, e) : e
                );
            },
            _fireCallback: function (t, e, i, s) {
                if (t && void 0 !== t[e])
                    for (var n = t[e].length, a = 0; a < n; a++) {
                        var o = t[e][a].namespace;
                        if (o === i) var r = t[e][a].handler.apply(this, s);
                    }
                return void 0 === r ? s : r;
            },
        }),
            (window.Kube = t);
    })(),
    (function (t) {
        (t.Plugin = {
            create: function (e, i) {
                return (
                    (i = void 0 === i ? e.toLowerCase() : i),
                    ($.fn[i] = function (s, n) {
                        var a = Array.prototype.slice.call(arguments, 1),
                            o = "fn." + i,
                            r = [];
                        return (
                            this.each(function () {
                                var i = $(this),
                                    l = i.data(o);
                                if (((n = "object" == typeof s ? s : n), l || (i.data(o, {}), i.data(o, (l = new t[e](this, n)))), "string" == typeof s))
                                    if ($.isFunction(l[s])) {
                                        var c = l[s].apply(l, a);
                                        void 0 !== c && r.push(c);
                                    } else $.error('No such method "' + s + '" for ' + e);
                            }),
                            0 === r.length || 1 === r.length ? (0 === r.length ? this : r[0]) : r
                        );
                    }),
                    ($.fn[i].options = {}),
                    this
                );
            },
            autoload: function (t) {
                for (var e = t.split(","), i = e.length, s = 0; s < i; s++) {
                    var n = e[s]
                        .toLowerCase()
                        .split(",")
                        .map(function (t) {
                            return t.trim();
                        })
                        .join(",");
                    this.autoloadQueue.push(n);
                }
                return this;
            },
            autoloadQueue: [],
            startAutoload: function () {
                if (window.MutationObserver && 0 !== this.autoloadQueue.length) {
                    var t = this;
                    new MutationObserver(function (e) {
                        e.forEach(function (e) {
                            var i = e.addedNodes;
                            0 === i.length || (1 === i.length && 3 === i.nodeType) || t.startAutoloadOnce();
                        });
                    }).observe(document, { subtree: !0, childList: !0 });
                }
            },
            startAutoloadOnce: function () {
                var t = this;
                $("[data-component]")
                    .not("[data-loaded]")
                    .each(function () {
                        var e = $(this),
                            i = e.data("component");
                        -1 !== t.autoloadQueue.indexOf(i) && (e.attr("data-loaded", !0), e[i]());
                    });
            },
            watch: function () {
                t.Plugin.startAutoloadOnce(), t.Plugin.startAutoload();
            },
        }),
            $(window).on("load", function () {
                t.Plugin.watch();
            });
    })(Kube),
    (function (t) {
        (t.Animation = function (e, i, s) {
            (this.namespace = "animation"),
                (this.defaults = {}),
                t.apply(this, arguments),
                (this.effect = i),
                (this.completeCallback = void 0 !== s && s),
                (this.prefixes = ["", "-moz-", "-o-animation-", "-webkit-"]),
                (this.queue = []),
                this.start();
        }),
            (t.Animation.prototype = {
                start: function () {
                    this.isSlideEffect() && this.setElementHeight(), this.addToQueue(), this.clean(), this.animate();
                },
                addToQueue: function () {
                    this.queue.push(this.effect);
                },
                setElementHeight: function () {
                    this.$element.height(this.$element.height());
                },
                removeElementHeight: function () {
                    this.$element.css("height", "");
                },
                isSlideEffect: function () {
                    return "slideDown" === this.effect || "slideUp" === this.effect;
                },
                isHideableEffect: function () {
                    var t = ["fadeOut", "slideUp", "flipOut", "zoomOut", "slideOutUp", "slideOutRight", "slideOutLeft"];
                    return -1 !== $.inArray(this.effect, t);
                },
                isToggleEffect: function () {
                    return "show" === this.effect || "hide" === this.effect;
                },
                storeHideClasses: function () {
                    this.$element.hasClass("hide-sm") ? this.$element.data("hide-sm-class", !0) : this.$element.hasClass("hide-md") && this.$element.data("hide-md-class", !0);
                },
                revertHideClasses: function () {
                    this.$element.data("hide-sm-class")
                        ? this.$element.addClass("hide-sm").removeData("hide-sm-class")
                        : this.$element.data("hide-md-class")
                        ? this.$element.addClass("hide-md").removeData("hide-md-class")
                        : this.$element.addClass("hide");
                },
                removeHideClass: function () {
                    this.$element.data("hide-sm-class") ? this.$element.removeClass("hide-sm") : this.$element.data("hide-md-class") ? this.$element.removeClass("hide-md") : this.$element.removeClass("hide");
                },
                animate: function () {
                    if ((this.storeHideClasses(), this.isToggleEffect())) return this.makeSimpleEffects();
                    this.$element.addClass("kubeanimated"), this.$element.addClass(this.queue[0]), this.removeHideClass();
                    var t = this.queue.length > 1 ? null : this.completeCallback;
                    this.complete("AnimationEnd", $.proxy(this.makeComplete, this), t);
                },
                makeSimpleEffects: function () {
                    "show" === this.effect ? this.removeHideClass() : "hide" === this.effect && this.revertHideClasses(), "function" == typeof this.completeCallback && this.completeCallback(this);
                },
                makeComplete: function () {
                    this.$element.hasClass(this.queue[0]) && (this.clean(), this.queue.shift(), this.queue.length && this.animate());
                },
                complete: function (t, e, i) {
                    var s = t.toLowerCase() + " webkit" + t + " o" + t + " MS" + t;
                    this.$element.one(
                        s,
                        $.proxy(function () {
                            "function" == typeof e && e(), this.isHideableEffect() && this.revertHideClasses(), this.isSlideEffect() && this.removeElementHeight(), "function" == typeof i && i(this), this.$element.off(s);
                        }, this)
                    );
                },
                clean: function () {
                    this.$element.removeClass("kubeanimated").removeClass(this.queue[0]);
                },
            }),
            t.Animation.inherits(t);
    })(Kube),
    (function (t) {
        (t.fn.animation = function (e, i) {
            var s = "fn.animation";
            return this.each(function () {
                var n = t(this);
                n.data(s);
                n.data(s, {}), n.data(s, new Kube.Animation(this, e, i));
            });
        }),
            (t.fn.animation.options = {});
    })(jQuery),
    (function (t) {
        (t.Detect = function () {}),
            (t.Detect.prototype = {
                isMobile: function () {
                    return /(iPhone|iPod|BlackBerry|Android)/.test(navigator.userAgent);
                },
                isDesktop: function () {
                    return !/(iPhone|iPod|iPad|BlackBerry|Android)/.test(navigator.userAgent);
                },
                isMobileScreen: function () {
                    return $(window).width() <= 768;
                },
                isTabletScreen: function () {
                    return $(window).width() >= 768 && $(window).width() <= 1024;
                },
                isDesktopScreen: function () {
                    return $(window).width() > 1024;
                },
            });
    })(Kube),
    (function (t) {
        (t.FormData = function (t) {
            this.opts = t.opts;
        }),
            (t.FormData.prototype = {
                set: function (t) {
                    this.data = t;
                },
                get: function (t) {
                    return (this.formdata = t), this.opts.appendForms && this.appendForms(), this.opts.appendFields && this.appendFields(), this.data;
                },
                appendFields: function () {
                    var t = $(this.opts.appendFields);
                    if (0 !== t.length) {
                        var e = this,
                            i = "";
                        this.formdata
                            ? t.each(function () {
                                  e.data.append($(this).attr("name"), $(this).val());
                              })
                            : (t.each(function () {
                                  i += "&" + $(this).attr("name") + "=" + $(this).val();
                              }),
                              (this.data = "" === this.data ? i.replace(/^&/, "") : this.data + i));
                    }
                },
                appendForms: function () {
                    var t = $(this.opts.appendForms);
                    if (0 !== t.length)
                        if (this.formdata) {
                            var e = this,
                                i = $(this.opts.appendForms).serializeArray();
                            $.each(i, function (t, i) {
                                e.data.append(i.name, i.value);
                            });
                        } else {
                            var s = t.serialize();
                            this.data = "" === this.data ? s : this.data + "&" + s;
                        }
                },
            });
    })(Kube),
    (function (t) {
        (t.Response = function (t) {}),
            (t.Response.prototype = {
                parse: function (t) {
                    if ("" === t) return !1;
                    var e = {};
                    try {
                        e = JSON.parse(t);
                    } catch (t) {
                        return !1;
                    }
                    if (void 0 !== e[0]) for (var i in e) this.parseItem(e[i]);
                    else this.parseItem(e);
                    return e;
                },
                parseItem: function (t) {
                    return (
                        "value" === t.type
                            ? $.each(
                                  t.data,
                                  $.proxy(function (t, e) {
                                      (e = null === e || !1 === e ? 0 : e), (e = !0 === e ? 1 : e), $(t).val(e);
                                  }, this)
                              )
                            : "html" === t.type
                            ? $.each(
                                  t.data,
                                  $.proxy(function (t, e) {
                                      (e = null === e || !1 === e ? "" : e), $(t).html(this.stripslashes(e));
                                  }, this)
                              )
                            : "addClass" === t.type
                            ? $.each(t.data, function (t, e) {
                                  $(t).addClass(e);
                              })
                            : "removeClass" === t.type
                            ? $.each(t.data, function (t, e) {
                                  $(t).removeClass(e);
                              })
                            : "command" === t.type
                            ? $.each(t.data, function (t, e) {
                                  $(e)[t]();
                              })
                            : "animation" === t.type
                            ? $.each(t.data, function (t, e) {
                                  (e.opts = void 0 === e.opts ? {} : e.opts), $(t).animation(e.name, e.opts);
                              })
                            : "location" === t.type
                            ? (top.location.href = t.data)
                            : "notify" === t.type && $.notify(t.data),
                        t
                    );
                },
                stripslashes: function (t) {
                    return (t + "").replace(/\0/g, "0").replace(/\\([\\'"])/g, "$1");
                },
            });
    })(Kube),
    (function (t) {
        (t.Utils = function () {}),
            (t.Utils.prototype = {
                disableBodyScroll: function () {
                    var t = $("html"),
                        e = window.innerWidth;
                    if (!e) {
                        var i = document.documentElement.getBoundingClientRect();
                        e = i.right - Math.abs(i.left);
                    }
                    var s = document.body.clientWidth < e,
                        n = this.measureScrollbar();
                    t.css("overflow", "hidden"), s && t.css("padding-right", n);
                },
                measureScrollbar: function () {
                    var t = $("body"),
                        e = document.createElement("div");
                    (e.className = "scrollbar-measure"), t.append(e);
                    var i = e.offsetWidth - e.clientWidth;
                    return t[0].removeChild(e), i;
                },
                enableBodyScroll: function () {
                    $("html").css({ overflow: "", "padding-right": "" });
                },
            });
    })(Kube),
    (function (t) {
        (t.Message = function (e, i) {
            (this.namespace = "message"),
                (this.defaults = { closeSelector: ".close", closeEvent: "click", animationOpen: "fadeIn", animationClose: "fadeOut", callbacks: ["open", "opened", "close", "closed"] }),
                t.apply(this, arguments),
                this.start();
        }),
            (t.Message.prototype = {
                start: function () {
                    (this.$close = this.$element.find(this.opts.closeSelector)), this.$close.on(this.opts.closeEvent + "." + this.namespace, $.proxy(this.close, this)), this.$element.addClass("open");
                },
                stop: function () {
                    this.$close.off("." + this.namespace), this.$element.removeClass("open");
                },
                open: function (t) {
                    t && t.preventDefault(), this.isOpened() || (this.callback("open"), this.$element.animation(this.opts.animationOpen, $.proxy(this.onOpened, this)));
                },
                isOpened: function () {
                    return this.$element.hasClass("open");
                },
                onOpened: function () {
                    this.callback("opened"), this.$element.addClass("open");
                },
                close: function (t) {
                    t && t.preventDefault(), this.isOpened() && (this.callback("close"), this.$element.animation(this.opts.animationClose, $.proxy(this.onClosed, this)));
                },
                onClosed: function () {
                    this.callback("closed"), this.$element.removeClass("open");
                },
            }),
            t.Message.inherits(t),
            t.Plugin.create("Message"),
            t.Plugin.autoload("Message");
    })(Kube),
    (function (t) {
        (t.Sticky = function (e, i) {
            (this.namespace = "sticky"), (this.defaults = { classname: "fixed", offset: 0, callbacks: ["fixed", "unfixed"] }), t.apply(this, arguments), this.start();
        }),
            (t.Sticky.prototype = {
                start: function () {
                    (this.offsetTop = this.getOffsetTop()), this.load(), $(window).scroll($.proxy(this.load, this));
                },
                getOffsetTop: function () {
                    return this.$element.offset().top;
                },
                load: function () {
                    return this.isFix() ? this.fixed() : this.unfixed();
                },
                isFix: function () {
                    return $(window).scrollTop() > this.offsetTop + this.opts.offset;
                },
                fixed: function () {
                    this.$element.addClass(this.opts.classname).css("top", this.opts.offset + "px"), this.callback("fixed");
                },
                unfixed: function () {
                    this.$element.removeClass(this.opts.classname).css("top", ""), this.callback("unfixed");
                },
            }),
            t.Sticky.inherits(t),
            t.Plugin.create("Sticky"),
            t.Plugin.autoload("Sticky");
    })(Kube),
    (function (t) {
        (t.Toggleme = function (e, i) {
            (this.namespace = "toggleme"),
                (this.defaults = { toggleEvent: "click", target: null, text: "", animationOpen: "slideDown", animationClose: "slideUp", callbacks: ["open", "opened", "close", "closed"] }),
                t.apply(this, arguments),
                this.start();
        }),
            (t.Toggleme.prototype = {
                start: function () {
                    this.hasTarget() && this.$element.on(this.opts.toggleEvent + "." + this.namespace, $.proxy(this.toggle, this));
                },
                stop: function () {
                    this.$element.off("." + this.namespace), this.revertText();
                },
                toggle: function (t) {
                    this.isOpened() ? this.close(t) : this.open(t);
                },
                open: function (t) {
                    t && t.preventDefault(), this.isOpened() || (this.storeText(), this.callback("open"), this.$target.animation("slideDown", $.proxy(this.onOpened, this)), setTimeout($.proxy(this.replaceText, this), 100));
                },
                close: function (t) {
                    t && t.preventDefault(), this.isOpened() && (this.callback("close"), this.$target.animation("slideUp", $.proxy(this.onClosed, this)));
                },
                isOpened: function () {
                    return this.$target.hasClass("open");
                },
                onOpened: function () {
                    this.$target.addClass("open"), this.callback("opened");
                },
                onClosed: function () {
                    this.$target.removeClass("open"), this.revertText(), this.callback("closed");
                },
                storeText: function () {
                    this.$element.data("replacement-text", this.$element.html());
                },
                revertText: function () {
                    var t = this.$element.data("replacement-text");
                    t && this.$element.html(t), this.$element.removeData("replacement-text");
                },
                replaceText: function () {
                    "" !== this.opts.text && this.$element.html(this.opts.text);
                },
            }),
            t.Toggleme.inherits(t),
            t.Plugin.create("Toggleme"),
            t.Plugin.autoload("Toggleme");
    })(Kube),
    (function (t) {
        (t.Offcanvas = function (e, i) {
            (this.namespace = "offcanvas"),
                (this.defaults = {
                    target: null,
                    push: !0,
                    width: "250px",
                    direction: "left",
                    toggleEvent: "click",
                    clickOutside: !0,
                    animationOpen: "slideInLeft",
                    animationClose: "slideOutLeft",
                    callbacks: ["open", "opened", "close", "closed"],
                }),
                t.apply(this, arguments),
                (this.utils = new t.Utils()),
                (this.detect = new t.Detect()),
                this.start();
        }),
            (t.Offcanvas.prototype = {
                start: function () {
                    this.hasTarget() &&
                        (this.buildTargetWidth(),
                        this.buildAnimationDirection(),
                        (this.$close = this.getCloseLink()),
                        this.$element.on(this.opts.toggleEvent + "." + this.namespace, $.proxy(this.toggle, this)),
                        this.$target.addClass("offcanvas"));
                },
                stop: function () {
                    this.closeAll(), this.$element.off("." + this.namespace), this.$close.off("." + this.namespace), $(document).off("." + this.namespace);
                },
                toggle: function (t) {
                    this.isOpened() ? this.close(t) : this.open(t);
                },
                buildTargetWidth: function () {
                    this.opts.width = $(window).width() < parseInt(this.opts.width) ? "100%" : this.opts.width;
                },
                buildAnimationDirection: function () {
                    "right" === this.opts.direction && ((this.opts.animationOpen = "slideInRight"), (this.opts.animationClose = "slideOutRight"));
                },
                getCloseLink: function () {
                    return this.$target.find(".close");
                },
                open: function (t) {
                    t && t.preventDefault(),
                        this.isOpened() ||
                            (this.closeAll(),
                            this.callback("open"),
                            this.$target.addClass("offcanvas-" + this.opts.direction),
                            this.$target.css("width", this.opts.width),
                            this.pushBody(),
                            this.$target.animation(this.opts.animationOpen, $.proxy(this.onOpened, this)));
                },
                closeAll: function () {
                    var t = $(document).find(".offcanvas");
                    0 !== t.length &&
                        (t.each(function () {
                            var t = $(this);
                            t.hasClass("open") && (t.css("width", "").animation("hide"), t.removeClass("open offcanvas-left offcanvas-right"));
                        }),
                        $(document).off("." + this.namespace),
                        $("body").css("left", ""));
                },
                close: function (t) {
                    if (t) {
                        var e = $(t.target);
                        if (("A" === e[0].tagName || "BUTTON" === e[0].tagName) && 0 !== e.closest(".offcanvas").length && !e.hasClass("close")) return;
                        t.preventDefault();
                    }
                    this.isOpened() && (this.utils.enableBodyScroll(), this.callback("close"), this.pullBody(), this.$target.animation(this.opts.animationClose, $.proxy(this.onClosed, this)));
                },
                isOpened: function () {
                    return this.$target.hasClass("open");
                },
                onOpened: function () {
                    this.opts.clickOutside && $(document).on("click." + this.namespace, $.proxy(this.close, this)),
                        this.detect.isMobileScreen() && $("html").addClass("no-scroll"),
                        $(document).on("keyup." + this.namespace, $.proxy(this.handleKeyboard, this)),
                        this.$close.on("click." + this.namespace, $.proxy(this.close, this)),
                        this.utils.disableBodyScroll(),
                        this.$target.addClass("open"),
                        this.callback("opened");
                },
                onClosed: function () {
                    this.detect.isMobileScreen() && $("html").removeClass("no-scroll"),
                        this.$target.css("width", "").removeClass("offcanvas-" + this.opts.direction),
                        this.$close.off("." + this.namespace),
                        $(document).off("." + this.namespace),
                        this.$target.removeClass("open"),
                        this.callback("closed");
                },
                handleKeyboard: function (t) {
                    27 === t.which && this.close();
                },
                pullBody: function () {
                    this.opts.push &&
                        $("body").animate({ left: 0 }, 350, function () {
                            $(this).removeClass("offcanvas-push-body");
                        });
                },
                pushBody: function () {
                    if (this.opts.push) {
                        var t = "left" === this.opts.direction ? { left: this.opts.width } : { left: "-" + this.opts.width };
                        $("body").addClass("offcanvas-push-body").animate(t, 200);
                    }
                },
            }),
            t.Offcanvas.inherits(t),
            t.Plugin.create("Offcanvas"),
            t.Plugin.autoload("Offcanvas");
    })(Kube),
    (function (t) {
        (t.Collapse = function (e, i) {
            (this.namespace = "collapse"),
                (this.defaults = { target: null, toggle: !0, active: !1, toggleClass: "collapse-toggle", boxClass: "collapse-box", callbacks: ["open", "opened", "close", "closed"], hashes: [], currentHash: !1, currentItem: !1 }),
                t.apply(this, arguments),
                this.start();
        }),
            (t.Collapse.prototype = {
                start: function () {
                    (this.$items = this.getItems()), this.$items.each($.proxy(this.loadItems, this)), (this.$boxes = this.getBoxes()), this.setActiveItem();
                },
                getItems: function () {
                    return this.$element.find("." + this.opts.toggleClass);
                },
                getBoxes: function () {
                    return this.$element.find("." + this.opts.boxClass);
                },
                loadItems: function (t, e) {
                    var i = this.getItem(e);
                    i.$el.attr("rel", i.hash), $(i.hash).hasClass("hide") || ((this.opts.currentItem = i), (this.opts.active = i.hash), i.$el.addClass("active")), i.$el.on("click.collapse", $.proxy(this.toggle, this));
                },
                setActiveItem: function () {
                    !1 !== this.opts.active && ((this.opts.currentItem = this.getItemBy(this.opts.active)), (this.opts.active = this.opts.currentItem.hash)),
                        !1 !== this.opts.currentItem && (this.addActive(this.opts.currentItem), this.opts.currentItem.$box.removeClass("hide"));
                },
                addActive: function (t) {
                    t.$box.removeClass("hide").addClass("open"), t.$el.addClass("active"), !1 !== t.$caret && t.$caret.removeClass("down").addClass("up"), !1 !== t.$parent && t.$parent.addClass("active"), (this.opts.currentItem = t);
                },
                removeActive: function (t) {
                    t.$box.removeClass("open"), t.$el.removeClass("active"), !1 !== t.$caret && t.$caret.addClass("down").removeClass("up"), !1 !== t.$parent && t.$parent.removeClass("active"), (this.opts.currentItem = !1);
                },
                toggle: function (t) {
                    t && t.preventDefault();
                    var e =
                            $(t.target)
                                .closest("." + this.opts.toggleClass)
                                .get(0) || t.target,
                        i = this.getItem(e);
                    this.isOpened(i.hash) ? this.close(i.hash) : this.open(t);
                },
                openAll: function () {
                    this.$items.addClass("active"), this.$boxes.addClass("open").removeClass("hide");
                },
                open: function (t, e) {
                    if (void 0 !== t) {
                        "object" == typeof t && t.preventDefault();
                        var i =
                                $(t.target)
                                    .closest("." + this.opts.toggleClass)
                                    .get(0) || t.target,
                            s = "object" == typeof t ? this.getItem(i) : this.getItemBy(t);
                        s.$box.hasClass("open") || (this.opts.toggle && this.closeAll(), this.callback("open", s), this.addActive(s), s.$box.animation("slideDown", $.proxy(this.onOpened, this)));
                    }
                },
                onOpened: function () {
                    this.callback("opened", this.opts.currentItem);
                },
                closeAll: function () {
                    this.$items.removeClass("active").closest("li").removeClass("active"), this.$boxes.removeClass("open").addClass("hide");
                },
                close: function (t) {
                    var e = this.getItemBy(t);
                    this.callback("close", e), (this.opts.currentItem = e), e.$box.animation("slideUp", $.proxy(this.onClosed, this));
                },
                onClosed: function () {
                    var t = this.opts.currentItem;
                    this.removeActive(t), this.callback("closed", t);
                },
                isOpened: function (t) {
                    return $(t).hasClass("open");
                },
                getItem: function (t) {
                    var e = {};
                    (e.$el = $(t)), (e.hash = e.$el.attr("href")), (e.$box = $(e.hash));
                    var i = e.$el.parent();
                    e.$parent = "LI" === i[0].tagName && i;
                    var s = e.$el.find(".caret");
                    return (e.$caret = 0 !== s.length && s), e;
                },
                getItemBy: function (t) {
                    var e = "number" == typeof t ? this.$items.eq(t - 1) : this.$element.find('[rel="' + t + '"]');
                    return this.getItem(e);
                },
            }),
            t.Collapse.inherits(t),
            t.Plugin.create("Collapse"),
            t.Plugin.autoload("Collapse");
    })(Kube),
    (function (t) {
        (t.Dropdown = function (e, i) {
            (this.namespace = "dropdown"),
                (this.defaults = { target: null, toggleEvent: "click", height: !1, width: !1, animationOpen: "slideDown", animationClose: "slideUp", caretUp: !1, callbacks: ["open", "opened", "close", "closed"] }),
                t.apply(this, arguments),
                (this.utils = new t.Utils()),
                (this.detect = new t.Detect()),
                this.start();
        }),
            (t.Dropdown.prototype = {
                start: function () {
                    this.buildClose(), this.buildCaret(), this.detect.isMobile() && this.buildMobileAnimation(), this.$target.addClass("hide"), this.$element.on(this.opts.toggleEvent + "." + this.namespace, $.proxy(this.toggle, this));
                },
                stop: function () {
                    this.$element.off("." + this.namespace), this.$target.removeClass("open").addClass("hide"), this.disableEvents();
                },
                buildMobileAnimation: function () {
                    (this.opts.animationOpen = "fadeIn"), (this.opts.animationClose = "fadeOut");
                },
                buildClose: function () {
                    this.$close = this.$target.find(".close");
                },
                buildCaret: function () {
                    (this.$caret = this.getCaret()), this.buildCaretPosition();
                },
                buildCaretPosition: function () {
                    var t = this.$element.offset().top + this.$element.innerHeight() + this.$target.innerHeight();
                    $(document).height() > t || ((this.opts.caretUp = !0), this.$caret.addClass("up"));
                },
                getCaret: function () {
                    return this.$element.find(".caret");
                },
                toggleCaretOpen: function () {
                    this.opts.caretUp ? this.$caret.removeClass("up").addClass("down") : this.$caret.removeClass("down").addClass("up");
                },
                toggleCaretClose: function () {
                    this.opts.caretUp ? this.$caret.removeClass("down").addClass("up") : this.$caret.removeClass("up").addClass("down");
                },
                toggle: function (t) {
                    this.isOpened() ? this.close(t) : this.open(t);
                },
                open: function (t) {
                    t && t.preventDefault(),
                        this.callback("open"),
                        $(".dropdown").removeClass("open").addClass("hide"),
                        this.opts.height && this.$target.css("min-height", this.opts.height + "px"),
                        this.opts.width && this.$target.width(this.opts.width),
                        this.setPosition(),
                        this.toggleCaretOpen(),
                        this.$target.animation(this.opts.animationOpen, $.proxy(this.onOpened, this));
                },
                close: function (t) {
                    if (this.isOpened()) {
                        if (t) {
                            if (this.shouldNotBeClosed(t.target)) return;
                            t.preventDefault();
                        }
                        this.utils.enableBodyScroll(), this.callback("close"), this.toggleCaretClose(), this.$target.animation(this.opts.animationClose, $.proxy(this.onClosed, this));
                    }
                },
                onClosed: function () {
                    this.$target.removeClass("open"), this.disableEvents(), this.callback("closed");
                },
                onOpened: function () {
                    this.$target.addClass("open"), this.enableEvents(), this.callback("opened");
                },
                isOpened: function () {
                    return this.$target.hasClass("open");
                },
                enableEvents: function () {
                    this.detect.isDesktop() && this.$target.on("mouseover." + this.namespace, $.proxy(this.utils.disableBodyScroll, this.utils)).on("mouseout." + this.namespace, $.proxy(this.utils.enableBodyScroll, this.utils)),
                        $(document).on("scroll." + this.namespace, $.proxy(this.setPosition, this)),
                        $(window).on("resize." + this.namespace, $.proxy(this.setPosition, this)),
                        $(document).on("click." + this.namespace + " touchstart." + this.namespace, $.proxy(this.close, this)),
                        $(document).on("keydown." + this.namespace, $.proxy(this.handleKeyboard, this)),
                        this.$target.find('[data-action="dropdown-close"]').on("click." + this.namespace, $.proxy(this.close, this));
                },
                disableEvents: function () {
                    this.$target.off("." + this.namespace), $(document).off("." + this.namespace), $(window).off("." + this.namespace);
                },
                handleKeyboard: function (t) {
                    27 === t.which && this.close(t);
                },
                shouldNotBeClosed: function (t) {
                    return "dropdown-close" !== $(t).attr("data-action") && t !== this.$close[0] && 0 !== $(t).closest(".dropdown").length;
                },
                isNavigationFixed: function () {
                    return 0 !== this.$element.closest(".fixed").length;
                },
                getPlacement: function (t) {
                    return $(document).height() < t ? "top" : "bottom";
                },
                getOffset: function (t) {
                    return this.isNavigationFixed() ? this.$element.position() : this.$element.offset();
                },
                getPosition: function () {
                    return this.isNavigationFixed() ? "fixed" : "absolute";
                },
                setPosition: function () {
                    if (this.detect.isMobile()) return void this.$target.addClass("dropdown-mobile");
                    var t,
                        e = this.getPosition(),
                        i = this.getOffset(e),
                        s = this.$target.innerHeight(),
                        n = this.$target.innerWidth(),
                        a = this.getPlacement(i.top + s + this.$element.innerHeight()),
                        o = $(window).width() < i.left + n ? n - this.$element.innerWidth() : 0,
                        r = i.left - o;
                    "bottom" === a
                        ? (this.isOpened() || this.$caret.removeClass("up").addClass("down"), (this.opts.caretUp = !1), (t = i.top + this.$element.outerHeight() + 1))
                        : ((this.opts.animationOpen = "show"), (this.opts.animationClose = "hide"), this.isOpened() || this.$caret.addClass("up").removeClass("down"), (this.opts.caretUp = !0), (t = i.top - s - 1)),
                        this.$target.css({ position: e, top: t + "px", left: r + "px" });
                },
            }),
            t.Dropdown.inherits(t),
            t.Plugin.create("Dropdown"),
            t.Plugin.autoload("Dropdown");
    })(Kube),
    (function (t) {
        (t.Tabs = function (e, i) {
            (this.namespace = "tabs"), (this.defaults = { equals: !1, active: !1, live: !1, hash: !0, callbacks: ["init", "next", "prev", "open", "opened", "close", "closed"] }), t.apply(this, arguments), this.start();
        }),
            (t.Tabs.prototype = {
                start: function () {
                    !1 !== this.opts.live && this.buildLiveTabs(),
                        (this.tabsCollection = []),
                        (this.hashesCollection = []),
                        (this.currentHash = []),
                        (this.currentItem = !1),
                        (this.$items = this.getItems()),
                        this.$items.each($.proxy(this.loadItems, this)),
                        (this.$tabs = this.getTabs()),
                        (this.currentHash = this.getLocationHash()),
                        this.closeAll(),
                        this.setActiveItem(),
                        this.setItemHeight(),
                        this.callback("init");
                },
                getTabs: function () {
                    return $(this.tabsCollection).map(function () {
                        return this.toArray();
                    });
                },
                getItems: function () {
                    return this.$element.find("a");
                },
                loadItems: function (t, e) {
                    var i = this.getItem(e);
                    i.$el.attr("rel", i.hash), this.collectItem(i), i.$parent.hasClass("active") && ((this.currentItem = i), (this.opts.active = i.hash)), i.$el.on("click.tabs", $.proxy(this.open, this));
                },
                collectItem: function (t) {
                    this.tabsCollection.push(t.$tab), this.hashesCollection.push(t.hash);
                },
                buildLiveTabs: function () {
                    var t = $(this.opts.live);
                    0 !== t.length && ((this.$liveTabsList = $("<ul />")), t.each($.proxy(this.buildLiveItem, this)), this.$element.html("").append(this.$liveTabsList));
                },
                buildLiveItem: function (t, e) {
                    var i = $(e),
                        s = $("<li />"),
                        n = $("<a />"),
                        a = t + 1;
                    i.attr("id", this.getLiveItemId(i, a));
                    var o = "#" + i.attr("id"),
                        r = this.getLiveItemTitle(i);
                    n.attr("href", o).attr("rel", o).text(r), s.append(n), this.$liveTabsList.append(s);
                },
                getLiveItemId: function (t, e) {
                    return void 0 === t.attr("id") ? this.opts.live.replace(".", "") + e : t.attr("id");
                },
                getLiveItemTitle: function (t) {
                    return void 0 === t.attr("data-title") ? t.attr("id") : t.attr("data-title");
                },
                setActiveItem: function () {
                    this.currentHash
                        ? ((this.currentItem = this.getItemBy(this.currentHash)), (this.opts.active = this.currentHash))
                        : !1 === this.opts.active && ((this.currentItem = this.getItem(this.$items.first())), (this.opts.active = this.currentItem.hash)),
                        this.addActive(this.currentItem);
                },
                addActive: function (t) {
                    t.$parent.addClass("active"), t.$tab.removeClass("hide").addClass("open"), (this.currentItem = t);
                },
                removeActive: function (t) {
                    t.$parent.removeClass("active"), t.$tab.addClass("hide").removeClass("open"), (this.currentItem = !1);
                },
                next: function (t) {
                    t && t.preventDefault();
                    var e = this.getItem(this.fetchElement("next"));
                    this.open(e.hash), this.callback("next", e);
                },
                prev: function (t) {
                    t && t.preventDefault();
                    var e = this.getItem(this.fetchElement("prev"));
                    this.open(e.hash), this.callback("prev", e);
                },
                fetchElement: function (t) {
                    var e;
                    if (!1 !== this.currentItem) {
                        if (((e = this.currentItem.$parent[t]().find("a")), 0 === e.length)) return;
                    } else e = this.$items[0];
                    return e;
                },
                open: function (t, e) {
                    if (void 0 !== t) {
                        "object" == typeof t && t.preventDefault();
                        var i = "object" == typeof t ? this.getItem(t.target) : this.getItemBy(t);
                        this.closeAll(), this.callback("open", i), this.addActive(i), this.pushStateOpen(e, i), this.callback("opened", i);
                    }
                },
                pushStateOpen: function (t, e) {
                    !1 !== t && !1 !== this.opts.hash && history.pushState(!1, !1, e.hash);
                },
                close: function (t) {
                    var e = this.getItemBy(t);
                    e.$parent.hasClass("active") && (this.callback("close", e), this.removeActive(e), this.pushStateClose(), this.callback("closed", e));
                },
                pushStateClose: function () {
                    !1 !== this.opts.hash && history.pushState(!1, !1, " ");
                },
                closeAll: function () {
                    this.$tabs.removeClass("open").addClass("hide"), this.$items.parent().removeClass("active");
                },
                getItem: function (t) {
                    var e = {};
                    return (e.$el = $(t)), (e.hash = e.$el.attr("href")), (e.$parent = e.$el.parent()), (e.$tab = $(e.hash)), e;
                },
                getItemBy: function (t) {
                    var e = "number" == typeof t ? this.$items.eq(t - 1) : this.$element.find('[rel="' + t + '"]');
                    return this.getItem(e);
                },
                getLocationHash: function () {
                    return !1 !== this.opts.hash && !!this.isHash() && top.location.hash;
                },
                isHash: function () {
                    return !("" === top.location.hash || -1 === $.inArray(top.location.hash, this.hashesCollection));
                },
                setItemHeight: function () {
                    if (this.opts.equals) {
                        var t = this.getItemMaxHeight() + "px";
                        this.$tabs.css("min-height", t);
                    }
                },
                getItemMaxHeight: function () {
                    var t = 0;
                    return (
                        this.$tabs.each(function () {
                            var e = $(this).height();
                            t = e > t ? e : t;
                        }),
                        t
                    );
                },
            }),
            t.Tabs.inherits(t),
            t.Plugin.create("Tabs"),
            t.Plugin.autoload("Tabs");
    })(Kube),
    (function (t) {
        (t.modalcurrent = null),
            (t.modalwindow = function (e) {
                var i = t.extend({}, e, { show: !0 });
                t("<span />").modal(i);
            });
    })(jQuery),
    (function (t) {
        (t.Modal = function (e, i) {
            (this.namespace = "modal"),
                (this.defaults = {
                    target: null,
                    show: !1,
                    url: !1,
                    header: !1,
                    width: "600px",
                    height: !1,
                    maxHeight: !1,
                    position: "center",
                    overlay: !0,
                    appendForms: !1,
                    appendFields: !1,
                    animationOpen: "show",
                    animationClose: "hide",
                    callbacks: ["open", "opened", "close", "closed"],
                }),
                t.apply(this, arguments),
                (this.utils = new t.Utils()),
                (this.detect = new t.Detect()),
                this.start();
        }),
            (t.Modal.prototype = {
                start: function () {
                    this.hasTarget() && (this.opts.show ? this.load() : this.$element.on("click." + this.namespace, $.proxy(this.load, this)));
                },
                buildModal: function () {
                    (this.$modal = this.$target.find(".modal")), (this.$header = this.$target.find(".modal-header")), (this.$close = this.$target.find(".close")), (this.$body = this.$target.find(".modal-body"));
                },
                buildOverlay: function () {
                    !1 !== this.opts.overlay &&
                        (0 !== $("#modal-overlay").length ? (this.$overlay = $("#modal-overlay")) : ((this.$overlay = $('<div id="modal-overlay">').addClass("hide")), $("body").prepend(this.$overlay)), this.$overlay.addClass("overlay"));
                },
                buildHeader: function () {
                    this.opts.header && this.$header.html(this.opts.header);
                },
                load: function (t) {
                    this.buildModal(), this.buildOverlay(), this.buildHeader(), this.opts.url ? this.buildContent() : this.open(t);
                },
                open: function (t) {
                    t && t.preventDefault(),
                        this.isOpened() ||
                            (this.detect.isMobile() && (this.opts.width = "96%"),
                            this.opts.overlay && this.$overlay.removeClass("hide"),
                            this.$target.removeClass("hide"),
                            this.$modal.removeClass("hide"),
                            this.enableEvents(),
                            this.findActions(),
                            this.resize(),
                            $(window).on("resize." + this.namespace, $.proxy(this.resize, this)),
                            this.detect.isDesktop() && this.utils.disableBodyScroll(),
                            this.$modal.find("input[type=text],input[type=url],input[type=email]").on("keydown." + this.namespace, $.proxy(this.handleEnter, this)),
                            this.callback("open"),
                            this.$modal.animation(this.opts.animationOpen, $.proxy(this.onOpened, this)));
                },
                close: function (t) {
                    if (this.$modal && this.isOpened()) {
                        if (t) {
                            if (this.shouldNotBeClosed(t.target)) return;
                            t.preventDefault();
                        }
                        this.callback("close"), this.disableEvents(), this.$modal.animation(this.opts.animationClose, $.proxy(this.onClosed, this)), this.opts.overlay && this.$overlay.animation(this.opts.animationClose);
                    }
                },
                onOpened: function () {
                    this.$modal.addClass("open"), this.callback("opened"), ($.modalcurrent = this);
                },
                onClosed: function () {
                    this.callback("closed"), this.$target.addClass("hide"), this.$modal.removeClass("open"), this.detect.isDesktop() && this.utils.enableBodyScroll(), this.$body.css("height", ""), ($.modalcurrent = null);
                },
                isOpened: function () {
                    return this.$modal.hasClass("open");
                },
                getData: function () {
                    var e = new t.FormData(this);
                    return e.set(""), e.get();
                },
                buildContent: function () {
                    $.ajax({
                        url: this.opts.url + "?" + new Date().getTime(),
                        cache: !1,
                        type: "post",
                        data: this.getData(),
                        success: $.proxy(function (t) {
                            this.$body.html(t), console.log(this), this.open();
                        }, this),
                    });
                },
                buildWidth: function () {
                    var t = this.opts.width,
                        e = "2%",
                        i = "2%",
                        s = t.match(/%$/);
                    parseInt(this.opts.width) > $(window).width() && !s ? (t = "96%") : s || ((e = "16px"), (i = "16px")), this.$modal.css({ width: t, "margin-top": e, "margin-bottom": i });
                },
                buildPosition: function () {
                    if ("center" === this.opts.position) {
                        var t = $(window).height(),
                            e = this.$modal.outerHeight(),
                            i = t / 2 - e / 2 + "px";
                        this.detect.isMobile() ? (i = "2%") : e > t && (i = "16px"), this.$modal.css("margin-top", i);
                    }
                },
                buildHeight: function () {
                    var t = $(window).height();
                    if (this.opts.maxHeight) {
                        var e = parseInt(this.$body.css("padding-top")) + parseInt(this.$body.css("padding-bottom")),
                            i = parseInt(this.$modal.css("margin-top")) + parseInt(this.$modal.css("margin-bottom")),
                            s = t - this.$header.innerHeight() - e - i;
                        this.$body.height(s);
                    } else !1 !== this.opts.height && this.$body.css("height", this.opts.height);
                    this.$modal.outerHeight() > t && ((this.opts.animationOpen = "show"), (this.opts.animationClose = "hide"));
                },
                resize: function () {
                    this.buildWidth(), this.buildPosition(), this.buildHeight();
                },
                enableEvents: function () {
                    this.$close.on("click." + this.namespace, $.proxy(this.close, this)), $(document).on("keyup." + this.namespace, $.proxy(this.handleEscape, this)), this.$target.on("click." + this.namespace, $.proxy(this.close, this));
                },
                disableEvents: function () {
                    this.$close.off("." + this.namespace), $(document).off("." + this.namespace), this.$target.off("." + this.namespace), $(window).off("." + this.namespace);
                },
                findActions: function () {
                    this.$body.find('[data-action="modal-close"]').on("mousedown." + this.namespace, $.proxy(this.close, this));
                },
                setHeader: function (t) {
                    this.$header.html(t);
                },
                setContent: function (t) {
                    this.$body.html(t);
                },
                setWidth: function (t) {
                    (this.opts.width = t), this.resize();
                },
                getModal: function () {
                    return this.$modal;
                },
                getBody: function () {
                    return this.$body;
                },
                getHeader: function () {
                    return this.$header;
                },
                handleEnter: function (t) {},
                handleEscape: function (t) {
                    return 27 !== t.which || this.close(!1);
                },
                shouldNotBeClosed: function (t) {
                    return "modal-close" !== $(t).attr("data-action") && t !== this.$close[0] && 0 !== $(t).closest(".modal").length;
                },
            }),
            t.Modal.inherits(t),
            t.Plugin.create("Modal"),
            t.Plugin.autoload("Modal");
    })(Kube);
var mmenu;
$(document).on("ready", function () {
    $(document).on("click", ".message-popup", function () {
        $(this).slideUp(120, function () {
            $(this).slideUp();
        });
    }),
        $(document).on("input", ".autocomplete.selected", function (t) {
            return (
                t.preventDefault(),
                t.stopPropagation(),
                t.stopImmediatePropagation(),
                $(this).parents(".autocomplete").find('input[type="hidden"]').val(""),
                $(this).parents(".autocomplete").find("input.autocomplete").removeClass("selected"),
                $(this).parents(".autocomplete").find("input.autocomplete").val(""),
                $(".result", $(this).parent()).remove(),
                $(".autocomplete .results .section").hide(),
                !1
            );
        }),
        $(document).on("input", "input.autocomplete", function () {
            $(this).val().length
                ? $.post("/api/autocomplete", { value: $(this).val(), model: $(this).data("class"), forInput: $(this).attr("name"), api_token: $('meta[name="api-key"]').attr("content") }, function (t) {
                      var e = t.forInput,
                          i = $('input.autocomplete[name="' + e + '"]');
                      if (t.results.length) {
                          var s = $(i).parent().find(".section");
                          $(".result", s).remove(), s.fadeIn();
                          for (var n in t.results)
                              s.append(
                                  '<div class="result" data-value="' +
                                      t.results[n].value +
                                      '"><span class="title">' +
                                      t.results[n].showAs +
                                      "</span>" +
                                      (t.results[n].extra ? '<span class="sub-title">' + t.results[n].extra + "</span></div>" : "")
                              );
                      } else $(i).parent().find(".section > .result").remove(), $(i).parent().find(".section").hide();
                  })
                : ($(this).siblings("input").val(""), $(".autocomplete .results .section").hide());
        }),
        $(document).on("click", ".autocomplete .results .result", function () {
            $(this).parents(".autocomplete").find('input[type="hidden"]').val($(this).data("value")),
                $(this).parents(".autocomplete").find("input.autocomplete").addClass("selected"),
                $(this).parents(".autocomplete").find("input.autocomplete").val($(".title", this).html()),
                $(".result", $(this).parent()).remove(),
                $(".autocomplete .results .section").hide();
        }),
        $("section.faqs .questions .question h3").on("click", function () {
            var t = $(this).parent(".question");
            t.hasClass("active") ? t.removeClass("active") : ($(".question").removeClass("active"), t.addClass("active"));
        }),
        $(".respToggle").on("click", function (t) {
            t.preventDefault();
            var e = $(this).data("panel"),
                i = $('.respToggleContent[data-panel="' + e + '"]').html();
            return (
                $("body").addClass("slideWindow"),
                $("#slideWindow .content").html(i),
                $("#slideWindow .content .owl-stage").css("transform", "inherit"),
                $("#slideWindow .content div").removeClass(function (t, e) {
                    return (e.match(/\owl-\S+/g) || []).join(" ");
                }),
                !1
            );
        }),
        $("#slideWindow").on("click", ".closePanel, .closeOverlay", function () {
            $("body").removeClass("slideWindow");
        }),
        $(".owl-carousel.reviewsSlider").owlCarousel({
            loop: !0,
            margin: 20,
            dots: !1,
            nav: !0,
            items: 2,
            navText: ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],
            navClass: ["prev", "next"],
            responsive: { 0: { items: 1 }, 540: { items: 2 } },
        }),
        $("section.points .owl-carousel").owlCarousel({ loop: !0, margin: 0, dots: !1, nav: !1, items: 1, autoplayTimeout: 2e3, animateOut: "fadeOut" }),
        setInterval(function () {
            var t = $("section.points .point.active");
            t.is(":last-child") ? $("section.points .point:first-child").addClass("active") : t.next(".point").addClass("active"), t.removeClass("active");
        }, 3500),

        $(".navlink").on("click", function () {
            $("#mm-blocker").trigger("mousedown");
        });
}),
    $(".toggleElement").on("click", function (t) {
        t.preventDefault();
        var e = $(this).attr("href").replace("#", "");
        $("." + e).toggle();
    });

$(".owl-carousel.includes").owlCarousel({
    loop: !0,
    margin: 0,
    dots: 1,
    nav: 0,
    items: 1,
    autoplay: true,
    autoplayTimeout: 3000,
    animateOut: "fadeOut",
});
$("section.whatsincluded .owl-carousel").owlCarousel({
    loop: !0,
    margin: 0,
    dots: 0,
    nav: 1,
    items: 1,
    navText: ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],
    navClass: ["prev", "next"],
});

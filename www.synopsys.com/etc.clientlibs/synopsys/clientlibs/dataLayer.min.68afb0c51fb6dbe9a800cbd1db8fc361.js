window.onload = function getPageLoadTime() {
    const loadTime = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;
    window.adobeDataLayer = window.adobeDataLayer || [];
    $("a").click(function() {
        var cardType = "";
        if ($(".nav-top-wrapper").find("a.active").text()) {
            var hier1 = $(".nav-top-wrapper").find("a.active").text();
            var hier = "";
            var level = "";
            var navListHeaderHier = "";
            var hier4 = "";
            if ($(this).parents(".nav-top-wrapper").length) {
                hier = hier1;
                level = "l1";
            } else if ($(this).parents(".sidenav-links").length) {
                let hier2 = $(this).text();
                hier = hier1 + "|" + hier2;
                level = "l2";
            }
             // to get hier and levels for right section links under Products Dropdown
             else if ($(this).parents("section.component-topNavAd").length){
                let hier2 = $(this).find("div.title").text();
                hier = hier1 + "|" + hier2;
                level = "l2";
            }
             // to get hier and level values for Right nav links under Products dropdown
            else if($(this).parents("div.nav-right-overview").length){
                let hier2 = $(this).text();
                hier = hier1 + "|" + hier2;
                level = "l2";
            }
            // to get hier and level values for sub-nav links within all the Header dropdowns, for example: Platforms link
            else if ($(this).parent().attr('class') == 'nav-list-header') {
                // sub-nav link header should be set as hier2 for Solutions and Company dropdowns
                let hier2 = $(this).text();
                navListHeaderHier = hier2;
                hier = hier1 + "|" + hier2;
                level = "l2";
                // to get hier2 text for Products dropdown
                if($(this).parents("div.nav-right-wrapper.active").length){
                    hier2 = $(".sidenav-links").find("a.active").text().replace(/\s+/g, " ").trim();
                    hier = hier1 + "|" + hier2 + "|" + navListHeaderHier;
                    level = "l3";
                }
            }
            // to get hier and level values for l4 links under Products dropdowns
            else if(($(this).parents("ul.nav-list").length) && ($(this).parents("div.nav-right-wrapper.active").length)) {
                hier2 = $(".sidenav-links").find("a.active").text().replace(/\s+/g, " ").trim();
                hier3 = $(this).closest(".nav-list").data("submenu-mobile");
                hier4 = $(this).text().replace(/\s+/g, " ").trim();
                hier = hier1 + "|" + hier2 + "|" + hier3 + "|" + hier4;
                level = "l4";
            } else if ($(this).parents(".component-nav-list").length) {
                let hier2 = $(this).closest(".nav-list").data("submenu-mobile");
                let hier3 = $(this).text().replace(/\s+/g, " ").trim();
                hier = hier1 + "|" + hier2 + "|" + hier3;
                level = "l3";
            } else if ($(this).parent().attr('class') == 'nav-left-item spacer') {
                hier = "Support|" + $(this).text();
                level = "l2";
                cardType = "topNav";
            }
        } else if ($(this).closest(".extra-top-margin").find("h3").text()) {
            var h1 = $(this).closest(".extra-top-margin").find("h3").text();
            let h3 = $(this).text();
            hier = h1 + "|" + h3;
            level = "l2";
        } else if ($(this).closest(".blue-text-links").find("h3").text()) {
            var h1 = $(this).closest(".blue-text-links").find("h3").text();
            let h3 = $(this).text();
            hier11 = h1 + "|" + h3;
            const replaced = hier11.replaceAll("\n", "");
            hier = replaced.replaceAll("   ", "");
            level = "l2";
        } else if ($(this).closest(".social-wrapper").find("h3").text()) {
            var h5 = $(this).closest(".social-wrapper").find("h3").text();
            var h6 = $(this).attr("title");
            hier = h5 + "|" + h6;
            level = "l2";
        } else if ($(this).closest(".component-railCard").find(".text").html()) {
            cardType = "rightRailComponent";
            if ($(this).attr("class") == "text") {
                var heading = $(this).text();
                hier = heading;
                level = "l1";
            } else {
                var h50 = $(this).closest(".component-railCard").find(".text").html();
                var h51 = $(this).text();
                hier = h50 + "|" + h51;
                level = "l2";
            }
            let regex = /\\n/g;
            hier = hier.replace(regex, "");
        } else if ($(this).closest("section").find(".SIG-Sub-container")) {
            if ($(this).attr("class") == "appSec-top-alert-banner-a") {
                cardType = "topRibbon";
            } else if ($(this).attr("class") == "subBreadcrumb") {
                var p1 = $(this).parent().parent().parent().find(".parent").text();
                var h51 = $(this).text();
                hier = p1 + "|" + h51;
                level = "l2";
            } else if ($(this).attr("class") == "parent") {
                hier = $(this).text();
                level = "l1";
            } else {
                var h = $(this).closest("nav").find(".SIG-mobile-breadcrumb").text();
                var g = $(this).closest("section").find("h2").text();
                var h510 = $(this).text();
                var c = $(this).parent();
                if (c.is("h2")) {
                    cardType = "bottomHeaderNav";
                    var hi1 = $(this).closest("nav").find(".SIG-mobile-breadcrumb").text();
                    var h2 = $(this).text();
                    hier = hi1 + "|" + h2;
                    level = "l2";
                } else if (h && g) {
                    cardType = "bottomHeaderNav";
                    hier = h + "|" + g + "|" + h510;
                    level = "l3";
                } else if ($(this).parent().parent().attr("class") == "SIG-Sub-ul") {
                    cardType = "bottomHeaderNav";
                    hier = h510;
                    level = "l1";
                }
            }
        } else if ($(this).attr("class") == "subBreadcrumb") {
            var p1 = $(this).find(".parent").text();
            var h51 = $(this).text();
            hier = h50 + "|" + h51;
            level = "l2";
        }
        var type = "exit";
        var railComponent = "";
        railComponent = $(this).closest("section").attr("rr-data-type-text");
        if (!cardType) {
            if (railComponent) cardType = "rightRailComponent";
            else if ($(this).closest("section").data("card-type")) cardType = $(this).closest("section").data("card-type");
            if ($(this).closest("div").parent().parent().parent().attr("id") && !($(this).closest("section").attr("class") == "cmp-blogsdev")) cardType = $(this).closest("div").parent().parent().parent().attr("id");
            else if ($(this).text() == "Learn More") cardType = "topRibbon";
            else if ($(this).attr("class") == "appSec-top-alert-banner-a") cardType = "topRibbon";
            else if ($(this).closest("footer").attr("class") == "site-footer") cardType = "footer";
            else if ($(this).closest("div").attr("class") == "component-nav-list") cardType = "headerNav";
            else if ($(this).closest("nav").attr("id") == "primary_nav_wrap") cardType = "bottomHeaderNav";
            else cardType = "body";
        }
        if (!hier) hier = "";
        if (!level) level = "";
        if (!railComponent) railComponent = "";
        const element = document.getElementById("myH1");
        var alt;
        if ($(this).find("img").length) {
            alt = $(this).children().attr("alt");
        }
        var name = "";
        var replaced2 = "";
        name = $(this).text().trim() ? $(this).text().trim() : alt;
        if (name) {
            const replaced = name.replaceAll("\n", "");
            replaced2 = replaced.replaceAll("   ", "");
            replaced2 = replaced2.replaceAll("\t", "");
        } else {
            name = $(this).attr("title");
            replaced2 = name;
        }
        if (hier) {
            hier = hier.replaceAll("\n", "");
            hier = hier.replaceAll("  ", "");
            let regex = /\\n/g;
            hier = hier.replace(regex, "");
        }
        if ($(this).attr("href")) {
            var uri = $(this).attr("href");
            if ((uri.indexOf("www.synopsys.com") > 1) || uri.indexOf('/') == 0 || uri == "#") {
                type = "other";
            }
        }
        if ($(this).attr("data-href")) {
            var uri = $(this).attr("data-href");
            if ((uri.indexOf("www.synopsys.com") > 1) || uri.indexOf('/') == 0 || uri == "#") {
                type = "other";
            }
        }
        if ($(this).attr("href")) {
            if ($(this).attr("href").indexOf("pdf") > 1) {
                type = "download";
            }
        }
        if ($(this).parent(".download-link").length > 0) {
            type = "download";
        }

        /* Wrike #941205638 - Setting web.webInteraction.type & web.webInteraction.region for Table of Contents anchor click action*/
        var tableOfContentsComponent = "";
        tableOfContentsComponent = $(this).hasClass("cmp-tableofcontents__content-item-text");
        if (tableOfContentsComponent) {
            type = "other";
            cardType = "tableOfContents";
            uri = $(this).data("href");
        }

        /* Wrike #941205638 - Setting web.webInteraction.region for Box Link anchor click action*/
        if ($(this).closest("section").attr("class") == "component-boxLink") {
            cardType = "boxLink";
        }
        
        /* Setting web.webInteraction.region, URL & name values for Social Share anchor click action*/
        if ($(this).closest("section").attr("class") == "cmp-socialshare") {
            type = "other";
            cardType = "socialShare";
            uri = $(this).data("socialMediaURL");
            replaced2 = $(this).data("socialMediaName");
        }

        /* Setting web.webInteraction.region for Blog Banner anchor click action*/
        if ($(this).closest("section").hasClass("cmp-blogbanner")) {
            cardType = "blogBanner";
        }

        /* Setting web.webInteraction.region for Author Profile component*/
        if ($(this).closest("section").attr("class") == "component-author-profile") {
            type = "other";
            cardType = "authorProfile";
            uri = $(this).attr("href");
            if(!name) replaced2 = $(this).text();
        }

        /* Setting web.webInteraction.region for Dynamic Cards anchor click action*/
        if ($(this).closest("section").hasClass("cmp-dynamiccards")) {
            cardType = "dynamicCards";
        }
        
        if (this.hasAttribute("href") || (this.hasAttribute("data-href"))) {
            if (type != "download") {
                window.adobeDataLayer.push({
                    event: "click-action",
                    web: {
                        webInteraction: {
                            URL: uri,
                            name: replaced2,
                            region: cardType,
                            type: type,
                            linkClicks: {
                                value: 1,
                            },
                        },
                    },
                    _synopsys: {
                        web: {
                            webInteraction: {
                                linkLevel: level,
                                linkHier: hier,
                                rightRailComponent: railComponent,
                            },
                        },
                    },
                });
            }
            if (type == "download") {
                const myArray = uri.split("/");
                var len = myArray.length;
                window.adobeDataLayer.push({
                    event: "click-action",
                    web: {
                        webInteraction: {
                            URL: uri,
                            region: cardType,
                            name: replaced2,
                            type: "download",
                            linkClicks: {
                                value: 1,
                            },
                        },
                    },
                    _synopsys: {
                        web: {
                            webInteraction: {
                                linkLevel: level,
                                linkHier: hier,
                                rightRailComponent: railComponent,
                                downloadID: myArray[len - 1],
                                downloadTitle: name,
                                downloadURL: $(this).attr("href"),
                                download: {
                                    value: 1,
                                },
                            },
                        },
                    },
                });
            }
        }
    });
    /*This function is called on Click of LighBox Image*/
    $("div.zoom-container").children("img.img-zoom.img-responsive").click(function(){
        var level = "";
        var hier = "";
        var railComponent = "";
        var cardType = "body";
        var type = "other";
        var uri = $(this).attr("src");
        /*Getting the Image name from both Dynamic-Media and DAM type of URLs*/
        var imgSplit = uri.split("/");
        var imageLastIndex = imgSplit[imgSplit.length - 1];
        var imgSplitByQuestion = imageLastIndex.split("?");
        var imageName = imgSplitByQuestion[0];
        sendAnalytics(uri, imageName, cardType, type, level, hier, railComponent);
    });

    /*This function is used to push data to Analytics*/
    function sendAnalytics (uri, imageName, cardType, type, level, hier, railComponent){
        window.adobeDataLayer.push({
            event: "click-action",
            web: {
                webInteraction: {
                    URL: uri,
                    name: imageName,
                    region: cardType,
                    type: type,
                    linkClicks: {
                        value: 1,
                    },
                },
            },
            _synopsys: {
                web: {
                    webInteraction: {
                        linkLevel: level,
                        linkHier: hier,
                        rightRailComponent: railComponent,
                    },
                },
            },
        });
    }
};

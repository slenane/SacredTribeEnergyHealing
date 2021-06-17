(function () {
    const shopifyClient = ShopifyBuy.buildClient({
        domain: 'test-store-8192.myshopify.com',
        storefrontAccessToken: 'fd46ea9a012ae63c832acc34d6a27ee8'
    }, fetch);
    let ui = ShopifyBuy.UI.init(shopifyClient);
    function ShopifyBuyInit() {
        let nodeElem = document.querySelector('.product-component');
        ui.createComponent('product', {
            id: Number(nodeElem.id),
            node: nodeElem,
            moneyFormat: '%E2%82%AC%7B%7Bamount_with_comma_separator%7D%7D',
            options: {
                    "product": {
                        "styles": {
                        "product": {
                            "@media (min-width: 601px)": {
                            "max-width": "100%",
                            "margin-left": "0",
                            "margin-bottom": "50px"
                            },
                            "text-align": "left"
                        },
                        "title": {
                            "font-size": "26px"
                        },
                        "button": {
                            "font-family": "Open Sans, sans-serif",
                            "font-size": "14px",
                            "padding-top": "15px",
                            "padding-bottom": "15px",
                            ":hover": {
                            "background-color": "#7757d3"
                            },
                            "background-color": "#8461ea",
                            ":focus": {
                            "background-color": "#7757d3"
                            }
                        },
                        "quantityInput": {
                            "font-size": "14px",
                            "padding-top": "15px",
                            "padding-bottom": "15px"
                        },
                        "price": {
                            "font-size": "18px"
                        },
                        "compareAt": {
                            "font-size": "15.299999999999999px"
                        },
                        "unitPrice": {
                            "font-size": "15.299999999999999px"
                        }
                        },
                        "layout": "horizontal",
                        "contents": {
                        "img": false,
                        "imgWithCarousel": true,
                        "description": true
                        },
                        "width": "100%",
                        "text": {
                        "button": "Add to cart"
                        },
                        "googleFonts": [
                        "Open Sans"
                        ]
                    },
                    "productSet": {
                        "styles": {
                        "products": {
                            "@media (min-width: 601px)": {
                            "margin-left": "-20px"
                            }
                        }
                        }
                    },
                    "modalProduct": {
                        "contents": {
                        "img": false,
                        "imgWithCarousel": true,
                        "button": false,
                        "buttonWithQuantity": true
                        },
                        "styles": {
                        "product": {
                            "@media (min-width: 601px)": {
                            "max-width": "100%",
                            "margin-left": "0px",
                            "margin-bottom": "0px"
                            }
                        },
                        "button": {
                            "font-family": "Open Sans, sans-serif",
                            "font-size": "14px",
                            "padding-top": "15px",
                            "padding-bottom": "15px",
                            ":hover": {
                            "background-color": "#7757d3"
                            },
                            "background-color": "#8461ea",
                            ":focus": {
                            "background-color": "#7757d3"
                            }
                        },
                        "quantityInput": {
                            "font-size": "14px",
                            "padding-top": "15px",
                            "padding-bottom": "15px"
                        },
                        "title": {
                            "font-family": "Helvetica Neue, sans-serif",
                            "font-weight": "bold",
                            "font-size": "26px",
                            "color": "#4c4c4c"
                        },
                        "price": {
                            "font-family": "Helvetica Neue, sans-serif",
                            "font-weight": "normal",
                            "font-size": "18px",
                            "color": "#4c4c4c"
                        },
                        "compareAt": {
                            "font-family": "Helvetica Neue, sans-serif",
                            "font-weight": "normal",
                            "font-size": "15.299999999999999px",
                            "color": "#4c4c4c"
                        },
                        "unitPrice": {
                            "font-family": "Helvetica Neue, sans-serif",
                            "font-weight": "normal",
                            "font-size": "15.299999999999999px",
                            "color": "#4c4c4c"
                        }
                        },
                        "googleFonts": [
                        "Open Sans"
                        ],
                        "text": {
                        "button": "Add to cart"
                        }
                    },
                    "option": {},
                    "cart": {
                        "styles": {
                        "button": {
                            "font-family": "Open Sans, sans-serif",
                            "font-size": "14px",
                            "padding-top": "15px",
                            "padding-bottom": "15px",
                            ":hover": {
                            "background-color": "#7757d3"
                            },
                            "background-color": "#8461ea",
                            ":focus": {
                            "background-color": "#7757d3"
                            }
                        }
                        },
                        "text": {
                        "total": "Subtotal",
                        "button": "Checkout"
                        },
                        "googleFonts": [
                        "Open Sans"
                        ]
                    },
                    "toggle": {
                        "styles": {
                        "toggle": {
                            "font-family": "Open Sans, sans-serif",
                            "background-color": "#8461ea",
                            ":hover": {
                            "background-color": "#7757d3"
                            },
                            ":focus": {
                            "background-color": "#7757d3"
                            }
                        },
                        "count": {
                            "font-size": "14px"
                        }
                        },
                        "googleFonts": [
                        "Open Sans"
                        ]
                    }
                    },
                        });
                    };
                    ShopifyBuyInit();
                    }
)();
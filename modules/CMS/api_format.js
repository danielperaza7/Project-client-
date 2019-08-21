export const Get_CMS_ID_response_data = {
  id: "ebe-homepage",
  name: "EBE home page",
  type: "page",
  modules: [
    {
      layout_id: "1",
      description: "homepage banners",
      configs: {
        colSettings: {
          1: {
            lg: 12, md: 12, sm: 12, xs: 12,
          },
        },
        predefined_classes: null,
        inline_classNames: null,
        inline_styles: null,
        positions: {
          1: {
            configs: {
              predefined_classes: null,
              inline_classNames: null,
              inline_styles: null,
            },
            components: [
              {
                id: "images_gallery_1",
                props: {
                  gallery: [
                    {
                      image_url: {
                        xl:
                          "https://keycdn.evestemptation.com/media/wysiwyg/HOMEPAGE/JUN2017/1-1.1496196624.jpg", //  for 1440+ screen width
                        lg:
                          "https://keycdn.evestemptation.com/media/wysiwyg/HOMEPAGE/JUN2017/1-1.1496196624.jpg", // for 1200~1439 screen width
                        md:
                          "https://keycdn.evestemptation.com/media/wysiwyg/HOMEPAGE/JUN2017/1-1.1496196624.jpg", // for 992~1199 screen width
                        sm:
                          "https://keycdn.evestemptation.com/media/wysiwyg/HOMEPAGE/JUN2017/1-1-t.1496196623.jpg", // for 768~991 screen width
                        xs:
                          "https://keycdn.evestemptation.com/media/wysiwyg/HOMEPAGE/JUN2017/1-1-t.1496196623.jpg", // for 0~767 screen width
                      },
                      link: {
                        path: null,
                        click: true,
                        url:
                          "https://www.evestemptation.com/category/filter/by-sale/cleansers-3-for-79?utm_medium=banner&utm_source=website&utm_campaign=HOMEPAGE-FathersDay&utm_term=FY_DSY_06_01_2017&utm_content=1-1",
                      },
                      description: "Eve by Eve's Skincare",
                    },
                    {
                      image_url: {
                        xl:
                          "https://keycdn.evestemptation.com/media/wysiwyg/HOMEPAGE/JUN2017/1-2.1496196621.jpg", //  for 1440+ screen width
                        lg:
                          "https://keycdn.evestemptation.com/media/wysiwyg/HOMEPAGE/JUN2017/1-2.1496196621.jpg", // for 1200~1439 screen width
                        md:
                          "https://keycdn.evestemptation.com/media/wysiwyg/HOMEPAGE/JUN2017/1-2.1496196621.jpg", // for 992~1199 screen width
                        sm:
                          "https://keycdn.evestemptation.com/media/wysiwyg/HOMEPAGE/JUN2017/1-2-t.1496196633.jpg", // for 768~991 screen width
                        xs:
                          "https://keycdn.evestemptation.com/media/wysiwyg/HOMEPAGE/JUN2017/1-2-t.1496196633.jpg", // for 0~767 screen width
                      },
                      link: {
                        path: null,
                        click: true,
                        url:
                          "https://www.evestemptation.com/category/lingerie/panties/filter/by-sale/may-clearance,panty-collection?utm_medium=banner&utm_source=website&utm_campaign=HOMEPAGE-LilyPanties&utm_term=FY_DSY_06_01_2017&utm_content=1-2",
                      },
                      description: "Eve by Eve's Skincare",
                    },
                  ],
                },
                responsive: {
                  xs: false,
                  sm: true,
                  md: true,
                  lg: true,
                  xl: true,
                },
              },
              {
                id: "image_2",
                props: {
                  image_url: {
                    xl: null, // w 2560px , for 1440+ screen width
                    lg: null, // w 1440px , for 768+ screen width
                    md: null, // w 750px  , for 0~767 screen width
                    sm: null, // w 750px  , for 0~767 screen width
                    xs:
                      "https://keycdn.evestemptation.com/media/wysiwyg/HOMEPAGE/JUN2017/1-1-m.1496196622.jpg", // w 750px  , for 0~767 screen width
                  },
                  link: {
                    path: null,
                    click: true,
                    url:
                      "https://www.evestemptation.com/category/lingerie/panties/filter/by-sale/may-clearance,panty-collection?utm_medium=banner&utm_source=website&utm_campaign=HOMEPAGE-LilyPanties&utm_term=FY_DSY_06_01_2017&utm_content=1-2",
                  },
                  description: "Eve by Eve's Skincare",
                },
                responsive: {
                  xs: true,
                  sm: false,
                  md: false,
                  lg: false,
                  xl: false,
                },
              },
              {
                id: "image_2",
                props: {
                  image_url: {
                    xl: null, // w 2560px , for 1440+ screen width
                    lg: null, // w 1440px , for 768+ screen width
                    md: null, // w 750px  , for 0~767 screen width
                    sm: null, // w 750px  , for 0~767 screen width
                    xs:
                      "https://keycdn.evestemptation.com/media/wysiwyg/HOMEPAGE/JUN2017/1-2-m.1496196624.jpg", // w 750px  , for 0~767 screen width
                  },
                  link: {
                    path: null,
                    click: true,
                    url:
                      "https://www.evestemptation.com/category/filter/by-sale/cleansers-3-for-79?utm_medium=banner&utm_source=website&utm_campaign=HOMEPAGE-FathersDay&utm_term=FY_DSY_06_01_2017&utm_content=1-1",
                  },
                  description: "Eve by Eve's Skincare",
                },
                responsive: {
                  xs: true,
                  sm: false,
                  md: false,
                  lg: false,
                  xl: false,
                },
              },
            ],
          },
        },
      },
    },
  ],
  meta: [
    {
      name: "keyword",
      content: "cms eve byecves keyword",
    },
    {
      name: "description",
      content: "cms description",
    },
  ],
};

export const POST_CMS_ID_Request = {
  token: "sdfsdfsdf",
  data: {
    id: "ebe-homepage",
    name: "EBE home page",
    type: "page",
    modules: [
      {
        layout_id: "1",
        description: "homepage banners",
        configs: {
          colSettings: {
            1: {
              lg: 12, md: 12, sm: 12, xs: 12,
            },
          },
          predefined_classes: null,
          inline_classNames: null,
          inline_styles: null,
          positions: {
            1: {
              configs: {
                predefined_classes: null,
                inline_classNames: null,
                inline_styles: null,
              },
              components: [
                {
                  id: "images_gallery_1",
                  props: {
                    gallery: [
                      {
                        image_url: {
                          xl:
                            "https://keycdn.evestemptation.com/media/wysiwyg/HOMEPAGE/JUN2017/1-1.1496196624.jpg", //  for 1440+ screen width
                          lg:
                            "https://keycdn.evestemptation.com/media/wysiwyg/HOMEPAGE/JUN2017/1-1.1496196624.jpg", // for 1200~1439 screen width
                          md:
                            "https://keycdn.evestemptation.com/media/wysiwyg/HOMEPAGE/JUN2017/1-1.1496196624.jpg", // for 992~1199 screen width
                          sm:
                            "https://keycdn.evestemptation.com/media/wysiwyg/HOMEPAGE/JUN2017/1-1-t.1496196623.jpg", // for 768~991 screen width
                          xs:
                            "https://keycdn.evestemptation.com/media/wysiwyg/HOMEPAGE/JUN2017/1-1-t.1496196623.jpg", // for 0~767 screen width
                        },
                        link: {
                          path: null,
                          click: true,
                          url:
                            "https://www.evestemptation.com/category/filter/by-sale/cleansers-3-for-79?utm_medium=banner&utm_source=website&utm_campaign=HOMEPAGE-FathersDay&utm_term=FY_DSY_06_01_2017&utm_content=1-1",
                        },
                        description: "Eve by Eve's Skincare",
                      },
                      {
                        image_url: {
                          xl:
                            "https://keycdn.evestemptation.com/media/wysiwyg/HOMEPAGE/JUN2017/1-2.1496196621.jpg", //  for 1440+ screen width
                          lg:
                            "https://keycdn.evestemptation.com/media/wysiwyg/HOMEPAGE/JUN2017/1-2.1496196621.jpg", // for 1200~1439 screen width
                          md:
                            "https://keycdn.evestemptation.com/media/wysiwyg/HOMEPAGE/JUN2017/1-2.1496196621.jpg", // for 992~1199 screen width
                          sm:
                            "https://keycdn.evestemptation.com/media/wysiwyg/HOMEPAGE/JUN2017/1-2-t.1496196633.jpg", // for 768~991 screen width
                          xs:
                            "https://keycdn.evestemptation.com/media/wysiwyg/HOMEPAGE/JUN2017/1-2-t.1496196633.jpg", // for 0~767 screen width
                        },
                        link: {
                          path: null,
                          click: true,
                          url:
                            "https://www.evestemptation.com/category/lingerie/panties/filter/by-sale/may-clearance,panty-collection?utm_medium=banner&utm_source=website&utm_campaign=HOMEPAGE-LilyPanties&utm_term=FY_DSY_06_01_2017&utm_content=1-2",
                        },
                        description: "Eve by Eve's Skincare",
                      },
                    ],
                  },
                  responsive: {
                    xs: false,
                    sm: true,
                    md: true,
                    lg: true,
                    xl: true,
                  },
                },
                {
                  id: "image_2",
                  props: {
                    image_url: {
                      xl: null, // w 2560px , for 1440+ screen width
                      lg: null, // w 1440px , for 768+ screen width
                      md: null, // w 750px  , for 0~767 screen width
                      sm: null, // w 750px  , for 0~767 screen width
                      xs:
                        "https://keycdn.evestemptation.com/media/wysiwyg/HOMEPAGE/JUN2017/1-1-m.1496196622.jpg", // w 750px  , for 0~767 screen width
                    },
                    link: {
                      path: null,
                      click: true,
                      url:
                        "https://www.evestemptation.com/category/lingerie/panties/filter/by-sale/may-clearance,panty-collection?utm_medium=banner&utm_source=website&utm_campaign=HOMEPAGE-LilyPanties&utm_term=FY_DSY_06_01_2017&utm_content=1-2",
                    },
                    description: "Eve by Eve's Skincare",
                  },
                  responsive: {
                    xs: true,
                    sm: false,
                    md: false,
                    lg: false,
                    xl: false,
                  },
                },
                {
                  id: "image_2",
                  props: {
                    image_url: {
                      xl: null, // w 2560px , for 1440+ screen width
                      lg: null, // w 1440px , for 768+ screen width
                      md: null, // w 750px  , for 0~767 screen width
                      sm: null, // w 750px  , for 0~767 screen width
                      xs:
                        "https://keycdn.evestemptation.com/media/wysiwyg/HOMEPAGE/JUN2017/1-2-m.1496196624.jpg", // w 750px  , for 0~767 screen width
                    },
                    link: {
                      path: null,
                      click: true,
                      url:
                        "https://www.evestemptation.com/category/filter/by-sale/cleansers-3-for-79?utm_medium=banner&utm_source=website&utm_campaign=HOMEPAGE-FathersDay&utm_term=FY_DSY_06_01_2017&utm_content=1-1",
                    },
                    description: "Eve by Eve's Skincare",
                  },
                  responsive: {
                    xs: true,
                    sm: false,
                    md: false,
                    lg: false,
                    xl: false,
                  },
                },
              ],
            },
          },
        },
      },
    ],
    meta: [
      {
        name: "keyword",
        content: "cms eve byecves keyword",
      },
      {
        name: "description",
        content: "cms description",
      },
    ],
  },
};

export const GET_CMS_LIST_Response = {
  cms_list: [
    {
      id: "ebe-homepage",
      name: "Ebe homepage",
      type: "page",
      created: "12242342",
      modifed: "12421312",
    },
  ],
};

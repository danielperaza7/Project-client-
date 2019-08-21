import React, { Component } from "react";
import MediaQuery from "react-responsive";

import BreastTypePC from "./BreastTypePC";
import BreastTypeMobile from "./BreastTypeMobile";

export const BreastTypeInfo_eng = {
  id: "breastType_eng",
  description: "super special English version CMS component used only for breastType ",
  // "props": {
  //   "BreastType": {
  //     "1": {
  //       "title": "娇小的兔兔",
  //       "img_main": {
  //         "mobile": "http://via.placeholder.com/80x80",
  //         "PC": "http://via.placeholder.com/80x80",
  //         "link": {
  //           "path": "product/h123456",
  //           "click": true,
  //           "url": null
  //         }
  //       },
  //       "img_sub": {
  //         "mobile": "http://via.placeholder.com/80x80",
  //         "PC": "http://via.placeholder.com/80x80",
  //         "link": {
  //           "path": "product/h123456",
  //           "click": true,
  //           "url": null
  //         }
  //       },
  //       "conclusion": "小胸也性感,选对内衣打造你的专属Style",
  //       "see_all_button": {
  //         "text": "查看此类内衣",
  //         "link": {
  //           "path": "product/h123456",
  //           "click": true,
  //           "url": null
  //         }
  //       },
  //       "see_all_button_bottom": {
  //         "text": "查看所有此胸型内衣",
  //         "link": {
  //           "path": "product/h123456",
  //           "click": true,
  //           "url": null
  //         }
  //       },
  //       "recommendation": "Eve's Temptation 四类内衣量身推荐",
  //       "details": {
  //         "step1": {
  //           "content": {
  //             "text1": "上托胸部,聚拢调整",
  //             "text2": "厚款或上薄下厚款,有钢圈,立体模杯,塑造胸型"
  //           },
  //           "images": {
  //             "img1": {
  //               "mobile": "http://via.placeholder.com/80x80",
  //               "PC": "http://via.placeholder.com/80x80",
  //               "link": {
  //                 "path": "product/h123456",
  //                 "click": true,
  //                 "url": null
  //               }
  //             },
  //             "img2": {
  //               "mobile": "http://via.placeholder.com/80x80",
  //               "PC": "http://via.placeholder.com/80x80",
  //               "link": {
  //                 "path": "product/h123456",
  //                 "click": true,
  //                 "url": null
  //               }
  //             }
  //           },
  //           "see_more": {
  //             "text": "查看更多",
  //             "link": {
  //               "path": "product/h123456",
  //               "click": true,
  //               "url": null
  //             }
  //           },
  //           "PC_right_hand_image": {
  //             "mobile": " http://via.placeholder.com/80x80",
  //             "PC": " http://via.placeholder.com/80x80",
  //             "link": {
  //               "path": "product/h123456",
  //               "click": true,
  //               "url": null
  //             }
  //           },
  //           "bottom_link_with_image": {
  //             "image": {
  //               "mobile": " http://via.placeholder.com/80x80",
  //               "PC": " http://via.placeholder.com/80x80"
  //             },
  //             "text": "推荐搭配硅胶乳贴，让胸部圆润无尴尬",
  //             "link": {
  //               "path": "product/h123456",
  //               "click": true,
  //               "url": null
  //             }
  //           }
  //         },
  //         "step2": {
  //           "content": {
  //             "text1": "轻薄舒适,演绎小胸独有性感",
  //             "text2": "有钢圈,精致细节,超薄杯,让胸部会呼吸"
  //           },
  //           "images": {
  //             "img1": {
  //               "mobile": "http://via.placeholder.com/80x80",
  //               "PC": "http://via.placeholder.com/80x80",
  //               "link": {
  //                 "path": "product/h123456",
  //                 "click": true,
  //                 "url": null
  //               }
  //             },
  //             "img2": {
  //               "mobile": "http://via.placeholder.com/80x80",
  //               "PC": "http://via.placeholder.com/80x80",
  //               "link": {
  //                 "path": "product/h123456",
  //                 "click": true,
  //                 "url": null
  //               }
  //             }
  //           },
  //           "see_more": {
  //             "text": "查看更多",
  //             "link": {
  //               "path": "product/h123456",
  //               "click": true,
  //               "url": null
  //             }
  //           },
  //           "PC_right_hand_image": {
  //             "mobile": " http://via.placeholder.com/80x80",
  //             "PC": " http://via.placeholder.com/80x80",
  //             "link": {
  //               "path": "product/h123456",
  //               "click": true,
  //               "url": null
  //             }
  //           },
  //           "bottom_link_with_image": {
  //             "image": {
  //               "mobile": " http://via.placeholder.com/80x80",
  //               "PC": " http://via.placeholder.com/80x80",
  //               "link": {
  //                 "path": "product/h123456",
  //                 "click": true,
  //                 "url": null
  //               }
  //             },
  //             "text": "推荐搭配硅胶乳贴，让胸部圆润无尴尬",
  //             "link": {
  //               "path": "product/h123456",
  //               "click": true,
  //               "url": null
  //             }
  //           }
  //         },
  //         "step3": {
  //           "content": {
  //             "text1": "舒适Bralettes,搭配外穿最流行",
  //             "text2": "无钢圈,薄/超薄杯,自由无束缚"
  //           },
  //           "images": {
  //             "img1": {
  //               "mobile": "http://via.placeholder.com/80x80",
  //               "PC": "http://via.placeholder.com/80x80",
  //               "link": {
  //                 "path": "product/h123456",
  //                 "click": true,
  //                 "url": null
  //               }
  //             },
  //             "img2": {
  //               "mobile": "http://via.placeholder.com/80x80",
  //               "PC": "http://via.placeholder.com/80x80",
  //               "link": {
  //                 "path": "product/h123456",
  //                 "click": true,
  //                 "url": null
  //               }
  //             }
  //           },
  //           "see_more": {
  //             "text": "查看更多",
  //             "link": {
  //               "path": "product/h123456",
  //               "click": true,
  //               "url": null
  //             }
  //           },
  //           "PC_right_hand_image": {
  //             "mobile": "http://via.placeholder.com/80x80",
  //             "PC": "http://via.placeholder.com/80x80",
  //             "link": {
  //               "path": "product/h123456",
  //               "click": true,
  //               "url": null
  //             }
  //           },
  //           "bottom_link_with_image": {
  //             "image": {
  //               "mobile": "http://via.placeholder.com/80x80",
  //               "PC": "http://via.placeholder.com/80x80",
  //               "link": {
  //                 "path": "product/h123456",
  //                 "click": true,
  //                 "url": null
  //               }
  //             },
  //             "text": "推荐搭配硅胶乳贴，让胸部圆润无尴尬",
  //             "link": {
  //               "path": "product/h123456",
  //               "click": true,
  //               "url": null
  //             }
  //           }
  //         },
  //         "step4": {
  //           "content": {
  //             "text1": "舒适贴合,自由塑造胸型",
  //             "text2": "棉围自然贴合胸部,可自由拆卸插垫,方便调整承托"
  //           },
  //           "images": {
  //             "img1": {
  //               "mobile": "http://via.placeholder.com/80x80",
  //               "PC": "http://via.placeholder.com/80x80",
  //               "link": {
  //                 "path": "product/h123456",
  //                 "click": true,
  //                 "url": null
  //               }
  //             },
  //             "img2": {
  //               "mobile": "http://via.placeholder.com/80x80",
  //               "PC": "http://via.placeholder.com/80x80",
  //               "link": {
  //                 "path": "product/h123456",
  //                 "click": true,
  //                 "url": null
  //               }
  //             }
  //           },
  //           "see_more": {
  //             "text": "查看更多",
  //             "link": {
  //               "path": "product/h123456",
  //               "click": true,
  //               "url": null
  //             }
  //           },
  //           "PC_right_hand_image": {
  //             "mobile": "http://via.placeholder.com/80x80",
  //             "PC": " http://via.placeholder.com/80x80",
  //             "link": {
  //               "path": "product/h123456",
  //               "click": true,
  //               "url": null
  //             }
  //           },
  //           "bottom_link_with_image": {
  //             "image": {
  //               "mobile": " http://via.placeholder.com/80x80",
  //               "PC": " http://via.placeholder.com/80x80",
  //               "link": {
  //                 "path": "product/h123456",
  //                 "click": true,
  //                 "url": null
  //               }
  //             },
  //             "text": "推荐搭配硅胶乳贴，让胸部圆润无尴尬",
  //             "link": {
  //               "path": "product/h123456",
  //               "click": true,
  //               "url": null
  //             }
  //           }
  //         }
  //       }
  //     },
  //     "2": {
  //       "title": "宽胸距的兔兔",
  //       "img_main": {
  //         "mobile": "http://via.placeholder.com/80x80",
  //         "PC": "http://via.placeholder.com/80x80",
  //         "link": {
  //           "path": "product/h123456",
  //           "click": true,
  //           "url": null
  //         }
  //       },
  //       "img_sub": {
  //         "mobile": "http://via.placeholder.com/80x80",
  //         "PC": "http://via.placeholder.com/80x80",
  //         "link": {
  //           "path": "product/h123456",
  //           "click": true,
  //           "url": null
  //         }
  //       },
  //       "conclusion": "胸部分散不聚拢？其实你也可以有迷人乳沟！",
  //       "see_all_button": {
  //         "text": "查看此类内衣",
  //         "link": {
  //           "path": "product/h123456",
  //           "click": true,
  //           "url": null
  //         }
  //       },
  //       "see_all_button_bottom": {
  //         "text": "查看所有此胸型内衣",
  //         "link": {
  //           "path": "product/h123456",
  //           "click": true,
  //           "url": null
  //         }
  //       },
  //       "recommendation": "Eve's Temptation 三类内衣倾情推荐",
  //       "details": {
  //         "step1": {
  //           "content": {
  //             "text1": "包裹聚拢,承托提升",
  //             "text2": "全罩杯,有效包裹乳房,上托聚拢"
  //           },
  //           "images": {
  //             "img1": {
  //               "mobile": "http://via.placeholder.com/80x80",
  //               "PC": "http://via.placeholder.com/80x80",
  //               "link": {
  //                 "path": "product/h123456",
  //                 "click": true,
  //                 "url": null
  //               }
  //             },
  //             "img2": {
  //               "mobile": "http://via.placeholder.com/80x80",
  //               "PC": "http://via.placeholder.com/80x80",
  //               "link": {
  //                 "path": "product/h123456",
  //                 "click": true,
  //                 "url": null
  //               }
  //             }
  //           },
  //           "see_more": {
  //             "text": "查看更多",
  //             "link": {
  //               "path": "product/h123456",
  //               "click": true,
  //               "url": null
  //             }
  //           },
  //           "PC_right_hand_image": {
  //             "mobile": " http://via.placeholder.com/80x80",
  //             "PC": " http://via.placeholder.com/80x80",
  //             "link": {
  //               "path": "product/h123456",
  //               "click": true,
  //               "url": null
  //             }
  //           },
  //           "bottom_link_with_image": {
  //             "image": {
  //               "mobile": " http://via.placeholder.com/80x80",
  //               "PC": " http://via.placeholder.com/80x80",
  //               "link": {
  //                 "path": "product/h123456",
  //                 "click": true,
  //                 "url": null
  //               }
  //             },
  //             "text": "推荐搭配硅胶乳贴，让胸部圆润无尴尬",
  //             "link": {
  //               "path": "product/h123456",
  //               "click": true,
  //               "url": null
  //             }
  //           }
  //         },
  //         "step2": {
  //           "content": {
  //             "text1": "上托胸部,聚拢调整",
  //             "text2": "全罩杯或3/4杯,立体模杯,聚拢同时调整胸型"
  //           },
  //           "images": {
  //             "img1": {
  //               "mobile": "http://via.placeholder.com/80x80",
  //               "PC": "http://via.placeholder.com/80x80",
  //               "link": {
  //                 "path": "product/h123456",
  //                 "click": true,
  //                 "url": null
  //               }
  //             },
  //             "img2": {
  //               "mobile": "http://via.placeholder.com/80x80",
  //               "PC": "http://via.placeholder.com/80x80",
  //               "link": {
  //                 "path": "product/h123456",
  //                 "click": true,
  //                 "url": null
  //               }
  //             }
  //           },
  //           "see_more": {
  //             "text": "查看更多",
  //             "link": {
  //               "path": "product/h123456",
  //               "click": true,
  //               "url": null
  //             }
  //           },
  //           "PC_right_hand_image": {
  //             "mobile": " http://via.placeholder.com/80x80",
  //             "PC": " http://via.placeholder.com/80x80",
  //             "link": {
  //               "path": "product/h123456",
  //               "click": true,
  //               "url": null
  //             }
  //           },
  //           "bottom_link_with_image": {
  //             "image": {
  //               "mobile": " http://via.placeholder.com/80x80",
  //               "PC": " http://via.placeholder.com/80x80",
  //               "link": {
  //                 "path": "product/h123456",
  //                 "click": true,
  //                 "url": null
  //               }
  //             },
  //             "text": "推荐搭配硅胶乳贴，让胸部圆润无尴尬",
  //             "link": {
  //               "path": "product/h123456",
  //               "click": true,
  //               "url": null
  //             }
  //           }
  //         },
  //         "step3": {
  //           "content": {
  //             "text1": "自然贴合,聚拢上托",
  //             "text2": "全罩杯或3/4杯,舒适棉围贴合胸部,侧推聚拢"
  //           },
  //           "images": {
  //             "img1": {
  //               "mobile": "http://via.placeholder.com/80x80",
  //               "PC": "http://via.placeholder.com/80x80",
  //               "link": {
  //                 "path": "product/h123456",
  //                 "click": true,
  //                 "url": null
  //               }
  //             },
  //             "img2": {
  //               "mobile": "http://via.placeholder.com/80x80",
  //               "PC": "http://via.placeholder.com/80x80",
  //               "link": {
  //                 "path": "product/h123456",
  //                 "click": true,
  //                 "url": null
  //               }
  //             }
  //           },
  //           "see_more": {
  //             "text": "查看更多",
  //             "link": {
  //               "path": "product/h123456",
  //               "click": true,
  //               "url": null
  //             }
  //           },
  //           "PC_right_hand_image": {
  //             "mobile": " http://via.placeholder.com/80x80",
  //             "PC": " http://via.placeholder.com/80x80",
  //             "link": {
  //               "path": "product/h123456",
  //               "click": true,
  //               "url": null
  //             }
  //           },
  //           "bottom_link_with_image": {
  //             "image": {
  //               "mobile": " http://via.placeholder.com/80x80",
  //               "PC": " http://via.placeholder.com/80x80",
  //               "link": {
  //                 "path": "product/h123456",
  //                 "click": true,
  //                 "url": null
  //               }
  //             },
  //             "text": "推荐搭配硅胶乳贴，让胸部圆润无尴尬",
  //             "link": {
  //               "path": "product/h123456",
  //               "click": true,
  //               "url": null
  //             }
  //           }
  //         }
  //       }
  //     },
  //     "3": {
  //       "title": "下垂的兔兔",
  //       "img_main": {
  //         "mobile": "http://via.placeholder.com/80x80",
  //         "PC": "http://via.placeholder.com/80x80",
  //         "link": {
  //           "path": "product/h123456",
  //           "click": true,
  //           "url": null
  //         }
  //       },
  //       "img_sub": {
  //         "mobile": "http://via.placeholder.com/80x80",
  //         "PC": "http://via.placeholder.com/80x80",
  //         "link": {
  //           "path": "product/h123456",
  //           "click": true,
  //           "url": null
  //         }
  //       },
  //       "conclusion": "胸部下垂不要紧,找到合适的内衣就能升回来",
  //       "see_all_button": {
  //         "text": "查看此类内衣",
  //         "link": {
  //           "path": "product/h123456",
  //           "click": true,
  //           "url": null
  //         }
  //       },
  //       "see_all_button_bottom": {
  //         "text": "查看所有此胸型内衣",
  //         "link": {
  //           "path": "product/h123456",
  //           "click": true,
  //           "url": null
  //         }
  //       },
  //       "recommendation": "Eve's Temptation 俩类内衣特别推荐",
  //       "details": {
  //         "step1": {
  //           "content": {
  //             "text1": "上托胸部,聚拢调整",
  //             "text2": "1/2或3/4杯,立体模杯,有下扒给予胸部额外的支撑"
  //           },
  //           "images": {
  //             "img1": {
  //               "mobile": "http://via.placeholder.com/80x80",
  //               "PC": "http://via.placeholder.com/80x80",
  //               "link": {
  //                 "path": "product/h123456",
  //                 "click": true,
  //                 "url": null
  //               }
  //             },
  //             "img2": {
  //               "mobile": "http://via.placeholder.com/80x80",
  //               "PC": "http://via.placeholder.com/80x80",
  //               "link": {
  //                 "path": "product/h123456",
  //                 "click": true,
  //                 "url": null
  //               }
  //             }
  //           },
  //           "see_more": {
  //             "text": "查看更多",
  //             "link": {
  //               "path": "product/h123456",
  //               "click": true,
  //               "url": null
  //             }
  //           },
  //           "PC_right_hand_image": {
  //             "mobile": " http://via.placeholder.com/80x80",
  //             "PC": " http://via.placeholder.com/80x80",
  //             "link": {
  //               "path": "product/h123456",
  //               "click": true,
  //               "url": null
  //             }
  //           },
  //           "bottom_link_with_image": {
  //             "image": {
  //               "mobile": " http://via.placeholder.com/80x80",
  //               "PC": " http://via.placeholder.com/80x80",
  //               "link": {
  //                 "path": "product/h123456",
  //                 "click": true,
  //                 "url": null
  //               }
  //             },
  //             "text": "推荐搭配硅胶乳贴，让胸部圆润无尴尬",
  //             "link": {
  //               "path": "product/h123456",
  //               "click": true,
  //               "url": null
  //             }
  //           }
  //         },
  //         "step2": {
  //           "content": {
  //             "text1": "自然贴合,上托聚拢",
  //             "text2": "1/2或3/4杯,舒适棉围贴合胸部,有下扒给予胸部额外的支撑"
  //           },
  //           "images": {
  //             "img1": {
  //               "mobile": " http://via.placeholder.com/80x80",
  //               "PC": " http://via.placeholder.com/80x80",
  //               "link": {
  //                 "path": "product/h123456",
  //                 "click": true,
  //                 "url": null
  //               }
  //             },
  //             "img2": {
  //               "mobile": " http://via.placeholder.com/80x80",
  //               "PC": " http://via.placeholder.com/80x80",
  //               "link": {
  //                 "path": "product/h123456",
  //                 "click": true,
  //                 "url": null
  //               }
  //             }
  //           },
  //           "see_more": {
  //             "text": "查看更多",
  //             "link": {
  //               "path": "product/h123456",
  //               "click": true,
  //               "url": null
  //             }
  //           },
  //           "PC_right_hand_image": {
  //             "mobile": " http://via.placeholder.com/80x80",
  //             "PC": " http://via.placeholder.com/80x80",
  //             "link": {
  //               "path": "product/h123456",
  //               "click": true,
  //               "url": null
  //             }
  //           },
  //           "bottom_link_with_image": {
  //             "image": {
  //               "mobile": " http://via.placeholder.com/80x80",
  //               "PC": " http://via.placeholder.com/80x80",
  //               "link": {
  //                 "path": "product/h123456",
  //                 "click": true,
  //                 "url": null
  //               }
  //             },
  //             "text": "推荐搭配硅胶乳贴，让胸部圆润无尴尬",
  //             "link": {
  //               "path": "product/h123456",
  //               "click": true,
  //               "url": null
  //             }
  //           }
  //         }
  //       }
  //     },
  //     "4": {
  //       "title": "美丽的兔兔",
  //       "img_main": {
  //         "mobile": " http://via.placeholder.com/80x80",
  //         "PC": " http://via.placeholder.com/80x80",
  //         "link": {
  //           "path": "product/h123456",
  //           "click": true,
  //           "url": null
  //         }
  //       },
  //       "img_sub": {
  //         "mobile": "http://via.placeholder.com/80x80",
  //         "PC": "http://via.placeholder.com/80x80",
  //         "link": {
  //           "path": "product/h123456",
  //           "click": true,
  //           "url": null
  //         }
  //       },
  //       "conclusion": "丰满的胸部加上有效的承托,更能打造健康迷人曲线",
  //       "see_all_button": {
  //         "text": "查看此类内衣",
  //         "link": {
  //           "path": "product/h123456",
  //           "click": true,
  //           "url": null
  //         }
  //       },
  //       "see_all_button_bottom": {
  //         "text": "查看所有此胸型内衣",
  //         "link": {
  //           "path": "product/h123456",
  //           "click": true,
  //           "url": null
  //         }
  //       },
  //       "recommendation": "Eve's Temptation 四类内衣精心推荐",
  //       "details": {
  //         "step1": {
  //           "content": {
  //             "text1": "包裹聚拢,承托提升",
  //             "text2": "全罩杯,有效包裹乳房,上托定型"
  //           },
  //           "images": {
  //             "img1": {
  //               "mobile": " http://via.placeholder.com/80x80",
  //               "PC": " http://via.placeholder.com/80x80",
  //               "link": {
  //                 "path": "product/h123456",
  //                 "click": true,
  //                 "url": null
  //               }
  //             },
  //             "img2": {
  //               "mobile": " http://via.placeholder.com/80x80",
  //               "PC": " http://via.placeholder.com/80x80",
  //               "link": {
  //                 "path": "product/h123456",
  //                 "click": true,
  //                 "url": null
  //               }
  //             }
  //           },
  //           "see_more": {
  //             "text": "查看更多",
  //             "link": {
  //               "path": "product/h123456",
  //               "click": true,
  //               "url": null
  //             }
  //           },
  //           "PC_right_hand_image": {
  //             "mobile": " http://via.placeholder.com/80x80",
  //             "PC": " http://via.placeholder.com/80x80",
  //             "link": {
  //               "path": "product/h123456",
  //               "click": true,
  //               "url": null
  //             }
  //           }
  //         },
  //         "step2": {
  //           "content": {
  //             "text1": "性感聚拢,自然承托",
  //             "text2": "3/4 杯,薄棉围,舒适塑造迷人曲线"
  //           },
  //           "images": {
  //             "img1": {
  //               "mobile": " http://via.placeholder.com/80x80",
  //               "PC": " http://via.placeholder.com/80x80",
  //               "link": {
  //                 "path": "product/h123456",
  //                 "click": true,
  //                 "url": null
  //               }
  //             },
  //             "img2": {
  //               "mobile": " http://via.placeholder.com/80x80",
  //               "PC": " http://via.placeholder.com/80x80",
  //               "link": {
  //                 "path": "product/h123456",
  //                 "click": true,
  //                 "url": null
  //               }
  //             }
  //           },
  //           "see_more": {
  //             "text": "查看更多",
  //             "link": {
  //               "path": "product/h123456",
  //               "click": true,
  //               "url": null
  //             }
  //           },
  //           "PC_right_hand_image": {
  //             "mobile": " http://via.placeholder.com/80x80",
  //             "PC": " http://via.placeholder.com/80x80",
  //             "link": {
  //               "path": "product/h123456",
  //               "click": true,
  //               "url": null
  //             }
  //           }
  //         },
  //         "step3": {
  //           "content": {
  //             "text1": "舒适软围,无束缚",
  //             "text2": "无钢圈,薄/超薄杯,搭配外穿也时尚"
  //           },
  //           "images": {
  //             "img1": {
  //               "mobile": " http://via.placeholder.com/80x80",
  //               "PC": " http://via.placeholder.com/80x80",
  //               "link": {
  //                 "path": "product/h123456",
  //                 "click": true,
  //                 "url": null
  //               }
  //             },
  //             "img2": {
  //               "mobile": " http://via.placeholder.com/80x80",
  //               "PC": " http://via.placeholder.com/80x80",
  //               "link": {
  //                 "path": "product/h123456",
  //                 "click": true,
  //                 "url": null
  //               }
  //             }
  //           },
  //           "see_more": {
  //             "text": "查看更多",
  //             "link": {
  //               "path": "product/h123456",
  //               "click": true,
  //               "url": null
  //             }
  //           },
  //           "PC_right_hand_image": {
  //             "mobile": " http://via.placeholder.com/80x80",
  //             "PC": " http://via.placeholder.com/80x80",
  //             "link": {
  //               "path": "product/h123456",
  //               "click": true,
  //               "url": null
  //             }
  //           }
  //         },
  //         "step4": {
  //           "content": {
  //             "text1": "轻薄舒适,上托定型",
  //             "text2": "有钢圈,精致细节,超薄杯,让胸部会呼吸"
  //           },
  //           "images": {
  //             "img1": {
  //               "mobile": " http://via.placeholder.com/80x80",
  //               "PC": " http://via.placeholder.com/80x80",
  //               "link": {
  //                 "path": "product/h123456",
  //                 "click": true,
  //                 "url": null
  //               }
  //             },
  //             "img2": {
  //               "mobile": " http://via.placeholder.com/80x80",
  //               "PC": " http://via.placeholder.com/80x80",
  //               "link": {
  //                 "path": "product/h123456",
  //                 "click": true,
  //                 "url": null
  //               }
  //             }
  //           },
  //           "see_more": {
  //             "text": "查看更多",
  //             "link": {
  //               "path": "product/h123456",
  //               "click": true,
  //               "url": null
  //             }
  //           },
  //           "PC_right_hand_image": {
  //             "mobile": " http://via.placeholder.com/80x80",
  //             "PC": " http://via.placeholder.com/80x80",
  //             "link": {
  //               "path": "product/h123456",
  //               "click": true,
  //               "url": null
  //             }
  //           },
  //           "bottom_link_with_image": {
  //             "image": {
  //               "mobile": " http://via.placeholder.com/80x80",
  //               "PC": " http://via.placeholder.com/80x80",
  //               "link": {
  //                 "path": "product/h123456",
  //                 "click": true,
  //                 "url": null
  //               }
  //             },
  //             "text": "推荐搭配硅胶乳贴，让胸部圆润无尴尬",
  //             "link": {
  //               "path": "product/h123456",
  //               "click": true,
  //               "url": null
  //             }
  //           }
  //         }
  //       }
  //     },
  //     "5": {
  //       "title": "多余的兔兔",
  //       "img_main": {
  //         "mobile": "http://via.placeholder.com/80x80",
  //         "PC": "http://via.placeholder.com/80x80",
  //         "link": {
  //           "path": "product/h123456",
  //           "click": true,
  //           "url": null
  //         }
  //       },
  //       "img_sub": {
  //         "mobile": "http://via.placeholder.com/80x80",
  //         "PC": "http://via.placeholder.com/80x80",
  //         "link": {
  //           "path": "product/h123456",
  //           "click": true,
  //           "url": null
  //         }
  //       },
  //       "conclusion": "告别副乳尴尬,小仙女不要这样的脂肪堆积",
  //       "see_all_button": {
  //         "text": "查看此类内衣",
  //         "link": {
  //           "path": "product/h123456",
  //           "click": true,
  //           "url": null
  //         }
  //       },
  //       "see_all_button_bottom": {
  //         "text": "查看所有此胸型内衣",
  //         "link": {
  //           "path": "product/h123456",
  //           "click": true,
  //           "url": null
  //         }
  //       },
  //       "recommendation": "Eve's Temptation 俩类内衣完美推荐",
  //       "details": {
  //         "step1": {
  //           "content": {
  //             "text1": "包裹聚拢,承托提升",
  //             "text2": "全罩杯,有效包裹肉肉,上托定型"
  //           },
  //           "images": {
  //             "img1": {
  //               "mobile": " http://via.placeholder.com/80x80",
  //               "PC": " http://via.placeholder.com/80x80",
  //               "link": {
  //                 "path": "product/h123456",
  //                 "click": true,
  //                 "url": null
  //               }
  //             },
  //             "img2": {
  //               "mobile": " http://via.placeholder.com/80x80",
  //               "PC": " http://via.placeholder.com/80x80",
  //               "link": {
  //                 "path": "product/h123456",
  //                 "click": true,
  //                 "url": null
  //               }
  //             }
  //           },
  //           "see_more": {
  //             "text": "查看更多",
  //             "link": {
  //               "path": "product/h123456",
  //               "click": true,
  //               "url": null
  //             }
  //           },
  //           "PC_right_hand_image": {
  //             "mobile": " http://via.placeholder.com/80x80",
  //             "PC": " http://via.placeholder.com/80x80",
  //             "link": {
  //               "path": "product/h123456",
  //               "click": true,
  //               "url": null
  //             }
  //           }
  //         },
  //         "step2": {
  //           "content": {
  //             "text1": "有效侧推,包裹聚拢",
  //             "text2": "塑身系列,薄/上厚下薄 模杯,有效收副乳"
  //           },
  //           "images": {
  //             "img1": {
  //               "mobile": " http://via.placeholder.com/80x80",
  //               "PC": " http://via.placeholder.com/80x80",
  //               "link": {
  //                 "path": "product/h123456",
  //                 "click": true,
  //                 "url": null
  //               }
  //             },
  //             "img2": {
  //               "mobile": " http://via.placeholder.com/80x80",
  //               "PC": " http://via.placeholder.com/80x80",
  //               "link": {
  //                 "path": "product/h123456",
  //                 "click": true,
  //                 "url": null
  //               }
  //             }
  //           },
  //           "see_more": {
  //             "text": "查看更多",
  //             "link": {
  //               "path": "product/h123456",
  //               "click": true,
  //               "url": null
  //             }
  //           },
  //           "PC_right_hand_image": {
  //             "mobile": " http://via.placeholder.com/80x80",
  //             "PC": " http://via.placeholder.com/80x80",
  //             "link": {
  //               "path": "product/h123456",
  //               "click": true,
  //               "url": null
  //             }
  //           },
  //           "bottom_link_with_image": {
  //             "image": {
  //               "mobile": " http://via.placeholder.com/80x80",
  //               "PC": " http://via.placeholder.com/80x80",
  //               "link": {
  //                 "path": "product/h123456",
  //                 "click": true,
  //                 "url": null
  //               }
  //             },
  //             "text": "推荐搭配硅胶乳贴，让胸部圆润无尴尬",
  //             "link": {
  //               "path": "product/h123456",
  //               "click": true,
  //               "url": null
  //             }
  //           }
  //         }
  //       }
  //     },
  //     "6": {
  //       "title": "时尚的兔兔",
  //       "img_main": {
  //         "mobile": " http://via.placeholder.com/80x80",
  //         "PC": " http://via.placeholder.com/80x80",
  //         "link": {
  //           "path": "product/h123456",
  //           "click": true,
  //           "url": null
  //         }
  //       },
  //       "img_sub": {
  //         "mobile": "http://via.placeholder.com/80x80",
  //         "PC": "http://via.placeholder.com/80x80",
  //         "link": {
  //           "path": "product/h123456",
  //           "click": true,
  //           "url": null
  //         }
  //       },
  //       "conclusion": "追求时尚,让胸前的装扮也能成为造型中最吸睛的一部分",
  //       "see_all_button": {
  //         "text": "查看此类内衣",
  //         "link": {
  //           "path": "product/h123456",
  //           "click": true,
  //           "url": null
  //         }
  //       },
  //       "see_all_button_bottom": {
  //         "text": "查看所有此胸型内衣",
  //         "link": {
  //           "path": "product/h123456",
  //           "click": true,
  //           "url": null
  //         }
  //       },
  //       "recommendation": "Eve's Temptation 俩类内衣特别推荐",
  //       "details": {
  //         "step1": {
  //           "content": {
  //             "text1": "轻松上托,轻薄无束缚",
  //             "text2": "全蕾丝,有钢圈,超薄杯,让胸部会呼吸"
  //           },
  //           "images": {
  //             "img1": {
  //               "mobile": " http://via.placeholder.com/80x80",
  //               "PC": " http://via.placeholder.com/80x80",
  //               "link": {
  //                 "path": "product/h123456",
  //                 "click": true,
  //                 "url": null
  //               }
  //             },
  //             "img2": {
  //               "mobile": " http://via.placeholder.com/80x80",
  //               "PC": " http://via.placeholder.com/80x80",
  //               "link": {
  //                 "path": "product/h123456",
  //                 "click": true,
  //                 "url": null
  //               }
  //             }
  //           },
  //           "see_more": {
  //             "text": "查看更多",
  //             "link": {
  //               "path": "product/h123456",
  //               "click": true,
  //               "url": null
  //             }
  //           },
  //           "PC_right_hand_image": {
  //             "mobile": " http://via.placeholder.com/80x80",
  //             "PC": " http://via.placeholder.com/80x80",
  //             "link": {
  //               "path": "product/h123456",
  //               "click": true,
  //               "url": null
  //             }
  //           },
  //           "bottom_link_with_image": {
  //             "image": {
  //               "mobile": " http://via.placeholder.com/80x80",
  //               "PC": " http://via.placeholder.com/80x80",
  //               "link": {
  //                 "path": "product/h123456",
  //                 "click": true,
  //                 "url": null
  //               }
  //             },
  //             "text": "推荐搭配硅胶乳贴，让胸部圆润无尴尬",
  //             "link": {
  //               "path": "product/h123456",
  //               "click": true,
  //               "url": null
  //             }
  //           }
  //         },
  //         "step2": {
  //           "content": {
  //             "text1": "潮流Bralettes,妩媚百搭",
  //             "text2": "精致蕾丝,无钢圈,薄/超薄杯,外穿也时尚"
  //           },
  //           "images": {
  //             "img1": {
  //               "mobile": " http://via.placeholder.com/80x80",
  //               "PC": " http://via.placeholder.com/80x80",
  //               "link": {
  //                 "path": "product/h123456",
  //                 "click": true,
  //                 "url": null
  //               }
  //             },
  //             "img2": {
  //               "mobile": " http://via.placeholder.com/80x80",
  //               "PC": " http://via.placeholder.com/80x80",
  //               "link": {
  //                 "path": "product/h123456",
  //                 "click": true,
  //                 "url": null
  //               }
  //             }
  //           },
  //           "see_more": {
  //             "text": "查看更多",
  //             "link": {
  //               "path": "product/h123456",
  //               "click": true,
  //               "url": null
  //             }
  //           },
  //           "PC_right_hand_image": {
  //             "mobile": " http://via.placeholder.com/80x80",
  //             "PC": " http://via.placeholder.com/80x80",
  //             "link": {
  //               "path": "product/h123456",
  //               "click": true,
  //               "url": null
  //             }
  //           },
  //           "bottom_link_with_image": {
  //             "image": {
  //               "mobile": " http://via.placeholder.com/80x80",
  //               "PC": " http://via.placeholder.com/80x80",
  //               "link": {
  //                 "path": "product/h123456",
  //                 "click": true,
  //                 "url": null
  //               }
  //             },
  //             "text": "推荐搭配硅胶乳贴，让胸部圆润无尴尬",
  //             "link": {
  //               "path": "product/h123456",
  //               "click": true,
  //               "url": null
  //             }
  //           }
  //         }
  //       }
  //     }
  //   }
  // },
  responsive: {
    xl: true,
    lg: true,
    md: true,
    sm: true,
    xs: true
  }
};

class BreastTypeENG extends Component {
  render() {
    const { BreastType, fakeDeviceWidth } = this.props;

    if (!BreastType) {
      return null;
    }

    const width_configs = {
      min: {
        xl: 1440, lg: 1200, md: 992, sm: 768, xs: 1
      },
      max: {
        xl: 10000, lg: 1439, md: 1199, sm: 991, xs: 767
      }
    };

    const responsive_list = ["xl", "lg", "md", "sm", "xs"].map((key) => {
      return (
        <MediaQuery
          minWidth={width_configs.min[key]}
          maxWidth={width_configs.max[key]}
          values={{ width: fakeDeviceWidth }}
          key={key}
        >
          {key === "xs" ? (
            <BreastTypeMobile BreastType={BreastType} fakeDeviceWidth={fakeDeviceWidth} />
          ) : (
            <BreastTypePC BreastType={BreastType} fakeDeviceWidth={fakeDeviceWidth} />
          )}
        </MediaQuery>
      );
    });

    return (
      <div>
        {" "}
        {responsive_list}
        {" "}
      </div>
    );
  }
}

export default BreastTypeENG;

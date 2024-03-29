export const MEMBERSHIP_NAME_LIST = ["Guest", "Silver", "Gold", "Platinum"];

export const MEMBERSHIP_NAME_DISCOUNT_MAPPING = {
  Guest: 1,
  Silver: 1,
  Gold: 0.95,
  Platinum: 0.88,
};

export const MEMBERSHIP_NAME_PRICE_MAPPING = {
  Silver: 2000,
  Gold: 8000,
  Platinum: 10000,
};

export const MEMBERSHIP_NAME_BENEFIT_MAPPING = {
  Silver: [
    {
      title: "first order",
      value: "Extra 10% off",
      is_et_products: true,
    },
    {
      title: "Current website",
      value: "Promotion",
    },
  ],
  Gold: [
    {
      title: "every order",
      value: "Extra 5% off",
      is_et_products: true,
    },
    {
      title: "current website",
      value: "Promotion",
    },
  ],
  Platinum: [
    {
      title: "every order",
      value: "Extra 12% off",
      is_et_products: true,
    },
    {
      title: "current website",
      value: "Promotion",
    },
  ],
  Staff: [{ title: "every order", value: "Extra 65% off" }],
  DealMoon: [{ title: "every order", value: "Extra 40% off" }],
};

export const MEMBERSHIP_LEVELUP_NAME_CONDITION_MAPPING = {
  Silver:
    "To enjoy more benefits, accumulate Membership Stars to reach to the next membership level",
  Gold:
    "To enjoy more benefits, accumulate Membership Stars to reach to the next membership level",
  Platinum:
    "To enjoy more benefits, accumulate Membership Stars to reach to the next membership level",
};

export const MEMBERSHIP_CODE_NAME_MAPPING = {
  0: "Guest",
  1: "Silver",
  2: "Gold",
  3: "Platinum",
  10: "Staff",
  11: "DealMoon",
};

export const HOW_TO_EARN_REWARD_POINTS = {
  "HOW TO EARN POINTS":
    "Points will be added to your reward balance after you take certain activities. For example, every time you make a purchase you will earn points based on the price of products purchased. Each $ 1.00 spent for your order will earn 1 Point.",
  "HOW TO SPEND POINTS":
    "In order to redeem your points you will need to log into your account. Once logged in, you will be able to see your total reward points under your name. Next to this select the “Redeem” option and you will be redirected to all the items which qualify for the month’s special. Please note, that the item(s) you want to redeem will ship along with your purchase order.",
};

export const MEMBERSHIP_ABANDON_DISPLAY_ID = [
  "E531976450820F",
  "E141572920710F",
  "E533172540980F",
  "E532271410030F",
  "E1415755B0340F",
  "E1414755A0340F",
  "J530281110730F",
  "E532671430820F",
  "E532371440710F",
  "E141575565010F",
  "E141372560980F",
  "E1413725409871",
  "E532271470030F",
  "E532271450030F",
  "E532271420030F",
  "J530381130980F",
  "J140181180730F",
  "J140181170730F",
  "J140181140730F",
  "E533377320070F",
  "E533377150070F",
  "E533377140610F",
  "E533377130080F",
  "E533377110070F",
  "E533272930730F",
  "E5331725900870",
  "E5331725800871",
  "E533172570080F",
  "E533172560980F",
  "E533172550080F",
  "E533172530980F",
  "E5331725109871",
  "E533072820080F",
  "E532972940840F",
  "E532972920000F",
  "E532972910980F",
  "E532972840680F",
  "E532972830840F",
  "E532875180000F",
  "E532875170340F",
  "E532875150000F",
  "E532875130520F",
  "E532875110340F",
  "E532671450820F",
  "E532671440820F",
  "E532671420820F",
  "E532671410820F",
  "E532571470080F",
  "E532571430080F",
  "E532571420080F",
  "E532171420370F",
  "E532171410370F",
  "E532075390000F",
  "E532075380000F",
  "E532075370000F",
  "E532075360000F",
  "E532075340000F",
  "E532075330000F",
  "E531976480820F",
  "E531976470820F",
  "E531976460820F",
  "E531976440820F",
  "E531976430820F",
  "E531976420820F",
  "E141672940070F",
  "E141672320840F",
  "E141672310840F",
  "E141575590450F",
  "E141575540840F",
  "E141575530980F",
  "E141575510340F",
  "E141572950070F",
  "E141572940000F",
  "E141475580450F",
  "E141475570080F",
  "E141475535010F",
  "E141272920980F",
  "E141272760980F",
  "E141272750980F",
  "E141272740980F",
  "E141272710730F",
  "E141272510980F",
  "C140404400033",
  "C140304405433",
  "C140304401133",
  "C140304303432",
  "C140304301132",
  "C140303205431",
  "J140181120000F",
  "J140181132110F",
  "J1401811A0730F",
  "J530281120820F",
  "J530281140390F",
  "J140181160730F",
  "E141272910980F",
  "E533272920730F",
  "E532972930730F",
  "E532875190520F",
  "E532671480820F",
  "E141672930070F",
  "E141575580720F",
  "E141575520540F",
  "E141475590540F",
  "E141372530980F",
  "E1413725209870",
  "C140304403433",
  "C140303203431",
  "E1415755A0580F",
  "C140304404533",
  "C140303204531",
  "J140181190730F",
  "J530381140980F",
  "E533377310080F",
  "E141372710980F",
  "E533377340070F",
  "E5331725209870",
  "E533377120820F",
  "E5331725A0080F",
  "E532972820680F",
  "E532972710980F",
  "E532972510980F",
  "E532875160520F",
  "E532671470820F",
  "E532571480080F",
  "E532571460080F",
  "E532571440080F",
  "E532471460450F",
  "E532471440450F",
  "E532471420450F",
  "E532075350000F",
  "E532075310000F",
  "E141572930790F",
  "E141572910710F",
  "E1414755D0340F",
  "E141475560980F",
  "E141475550350F",
  "E141475540080F",
  "E141475520030F",
  "E141272730980F",
  "C140304305432",
  "C140303201131",
  "E533377330080F",
  "E1414755C0540F",
  "E141672920790F",
  "E532571450080F",
  "E141672910000F",
  "E1414755B0450F",
  "E532571410080F",
  "E532471490450F",
  "E532471480450F",
  "E532471430450F",
  "E532471410450F",
  "E532371410710F",
  "E532271480030F",
  "E532271460030F",
  "E141672350790F",
  "E141672330790F",
  "E141372570980F",
  "E533272910980F",
  "E533072810080F",
  "E532972810840F",
  "E532875140340F",
  "E532671460820F",
  "E1413725509870",
  "E532471470450F",
  "E532171430370F",
  "E5320753A0000F",
  "E532075320000F",
  "E141575575010F",
  "E141575550580F",
  "E141475510030F",
  "E141372B10730F",
  "C140404300032",
  "E141572960790F",
  "J530381110980F",
  "E532271430030F",
  "E141572D10710F",
  "E141272720730F",
  "J140181110980F",
  "E1413725109871",
  "E532875120000F",
  "E532775120820F",
  "E532775110820F",
  "E532471450450F",
  "E532371430710F",
  "J530281130390F",
  "E532271440030F",
  "E141272810980F",
  "E532972950980F",
  "E532371420710F",
  "E531976410820F",
  "J530381120980F",
  "E141672340820F",
  "C140403200031",
  "J140181150730F",
  "E141272610980F",
  "E141272520980F",
  "C140304304532",
];

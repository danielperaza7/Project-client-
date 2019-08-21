export function constructGoogleStructuredData(type, data) {
  switch (type) {
    case "Product":
      return `{
            "@context": "http://schema.org",
            "@type": "Product",
            "image": "${data.images.main.images.md.url}",
            "name": "${data.name}",
            "description": "${
  data.meta && data.meta.description
    ? data.meta.description.replace(/[\r\n]/g, " | ")
    : ""
}",
            "brand": {
              "@type": "Brand",
              "name": "${data.store === "et" ? "Eve's Temptation" : "Eve by Eve's"}",
              "logo": "${
  data.store === "et"
    ? "https://hiddenfigure.evestemptation.com/email/LOGO/ET%20Logo%2020px_H.svg"
    : "https://hiddenfigure.evestemptation.com/email/LOGO/EBE%20Logo%2020px_H.svg"
}",
              "url": "${
  data.store === "et"
    ? "https://www.evestemptation.com/et"
    : "https://www.evestemptation.com/ebe"
}"
            },
            "category": "${data.simples[0].category}",
            "color": "${
  data.configs.color
    ? data.configs.color.options.reduce((res, ele) => (res += `${ele.name}, `), "")
    : ""
}",
            "sku": "${data.display_id}",
            "url": "https://www.evestemptation.com/product/${data.display_id}",
            "offers": {
              "@type": "Offer",
              "price": "${data.simples[0].price}",
              "priceCurrency": "USD",
              "url": "https://www.evestemptation.com/product/${data.display_id}"
            },
          }
      `;
      break;
    default:
  }
}

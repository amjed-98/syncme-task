import axios from "axios";

const wooCommerceConfig = {
  baseURL: "https://sooksync.io/wp-json/wc/v3/products/categories",
  auth: {
    username: "ck_ac6103d8b55163464f63b7d026366d26296b2ca7",
    password: "cs_6b794c62a0371d5e204ea25b75e3f52c356af265",
  },
};

export class WooCommerceService {
  static async fetchCategories() {
    const response = await axios.get<Category[]>(wooCommerceConfig.baseURL, {
      auth: wooCommerceConfig.auth,
    });
    return response.data;
  }
}

type Category = {
  id: number;
  name: string;
  slug: string;
  parent: number;
  description: string;
  display: string;
};

WooCommerceService.fetchCategories().then(console.log);

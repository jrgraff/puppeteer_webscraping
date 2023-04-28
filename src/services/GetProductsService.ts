import puppeteer from 'puppeteer';

import { ProductResponse } from '../interfaces/ProductResponse';

type ProductsResponse = {
  products_count: number;
  products: ProductResponse[];
};

class GetProductsService {
  async execute(searchParam: string): Promise<ProductsResponse> {
    const browser = await puppeteer.launch();
    const [page] = await browser.pages();

    await page.goto('https://webscraper.io/test-sites/e-commerce/allinone/computers/laptops');

    const urls = await page.evaluate(() =>
      Array.from(document.querySelectorAll('.thumbnail'), (e) => {
        return {
          name: e.querySelector<HTMLAnchorElement>('.caption a')!.title,
          url: e.querySelector<HTMLAnchorElement>('.caption a')!.href,
        };
      }).filter(val => val),
    );

    page.close();

    const parsedUrls = urls.filter(val => val.name?.includes(
      searchParam.charAt(0).toUpperCase() + searchParam.slice(1),
    )).map(product => product.url);

    const products = await Promise.all(
      parsedUrls.map(async url => {
        const newPage = await browser.newPage();
        await newPage.goto(url);

        const product = await newPage.evaluate(async () => {
          const specs = Array.from(document.querySelectorAll('.swatches button') as NodeListOf<HTMLButtonElement>, (e: HTMLButtonElement) => {
            e.click();

            return {
              price: Number(document.querySelector('.caption > h4')?.innerHTML.replace('$', '')),
              storage: e.innerHTML,
              availability: !e.className.includes('disabled'),
            };
            
          });

          return {
            name: document.querySelector('.caption h4:last-of-type')!.innerHTML,
            specs,
            reviews: Number(
              document.querySelector('.ratings p')?.innerHTML.replace(/\D/g, ''),
            ),
            rating: document.querySelectorAll('.ratings span').length,
            description: document.querySelector('.description')!.innerHTML,
          };
        });

        newPage.close();

        return product;
      }),
    );

    await browser.close();

    return { products_count: products.length, products };
  }
}

export default GetProductsService;

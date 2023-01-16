import puppeteer from 'puppeteer';
import ProductResponse from '../interfaces/ProductResponse';

class GetProductsService {
  async execute(searchParam: string, sortType: string): Promise<ProductResponse[]> {
    const url =
      'https://webscraper.io/test-sites/e-commerce/allinone/computers/laptops';

    const getProducts = async () => {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();

      await page.goto(url);
      await page.waitForSelector('.wrapper');

      const products = await page.evaluate(() =>
        Array.from(document.querySelectorAll('.thumbnail'), (e) => ({
          name: e.querySelector<HTMLAnchorElement>('.caption a')!.title,
          price: Number(
            e.querySelector('.caption > h4')?.innerHTML.replace('$', ''),
          ),
          reviews: Number(
            e.querySelector('.ratings p')?.innerHTML.replace(/\D/g, ''),
          ),
          rating: e.querySelectorAll('.ratings span').length,
          tags: e
            .querySelector('.description')!
            .innerHTML.split(',')
            .map((tag) => tag.trim()),
        })),
      );

      await browser.close();

      return products
        .filter((product) =>
          product.name?.includes(
            searchParam.charAt(0).toUpperCase() + searchParam.slice(1),
          ),
        )
        .sort((a, b) =>
          sortType.toUpperCase() === 'ASC'
            ? a.price - b.price
            : b.price - a.price,
        );
    };

    return getProducts();
  }
}

export default GetProductsService;

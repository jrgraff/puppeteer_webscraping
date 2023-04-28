import puppeteer from 'puppeteer';
import ProductResponse from '../interfaces/ProductResponse';


class GetProductsService {
  async execute(searchParam: string): Promise<ProductResponse[]> {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('https://webscraper.io/test-sites/e-commerce/allinone/computers/laptops');

    const urls = await page.evaluate(() =>
      Array.from(document.querySelectorAll('.thumbnail'), (e) => {
        return {
          name: e.querySelector<HTMLAnchorElement>('.caption a')!.title,
          url: e.querySelector<HTMLAnchorElement>('.caption a')!.href,
        };
      }).filter(val => val),
    );
    
    const parsedUrls = urls.filter(val => val.name?.includes(
      searchParam.charAt(0).toUpperCase() + searchParam.slice(1),
    )).map(product => product.url);

    const products = await Promise.all(
      parsedUrls.map(async url => {
        const newPage = await browser.newPage();
        await newPage.goto(url);

        return newPage.evaluate(() => ({
          name: document.querySelector('.caption h4:last-of-type')!.innerHTML,
          price: Number(document.querySelector('.caption > h4')?.innerHTML.replace('$', '')),
          reviews: Number(
            document.querySelector('.ratings p')?.innerHTML.replace(/\D/g, ''),
          ),
          rating: document.querySelectorAll('.ratings span').length,
          description: document.querySelector('.description')!.innerHTML,
        }));
      }),
    );

    await browser.close();

    return products;
  }
}

export default GetProductsService;

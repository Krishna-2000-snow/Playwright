interface Product {
  readonly name: string;
  readonly price: number;
}

const products: Product[] = [
  { name: "Keyboard", price: 750 },
  { name: "Mouse", price: 450 },
  { name: "Monitor", price: 1200 },
];

const namesAbove500 = products
  .filter((product) => product.price > 500)
  .map((product) => product.name);

console.log(namesAbove500);

async function wait(ms: number): Promise<void> {
  await new Promise<void>((resolve) => setTimeout(resolve, ms));
}

async function showWaitMessage(): Promise<void> {
  await wait(1000);
  console.log("Wait complete");
}

void showWaitMessage();

class Cart {
  private items: Product[] = [];

  add(p: Product): void {
    this.items.push(p);
  }

  total(): number {
    return this.items.reduce((sum, product) => sum + product.price, 0);
  }
  
}

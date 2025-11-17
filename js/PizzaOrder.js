export class PizzaOrder {
    constructor(pizza) {
        this.name = pizza.name;
        this.basePrice = pizza.price;
        this.image = pizza.image;
        this.ingredients = [...pizza.ingredients];
        this.size = 28;
        this.quantity = 1;
    }

    addIngredient(ing) {
        if (!this.ingredients.includes(ing)) {
            this.ingredients.push(ing);
        }
    }

    removeIngredient(ing) {
        this.ingredients = this.ingredients.filter(i => i !== ing);
    }

    setSize(size) {
        this.size = size;
    }

    incQty() {
        this.quantity++;
    }

    decQty() {
        this.quantity = Math.max(1, this.quantity - 1);
    }

    getTotalPrice() {
        let sizeMultiplier = {
            22: 0.85,
            28: 1,
            33: 1.25,
        };

        let price = this.basePrice * sizeMultiplier[this.size];
        price += (this.ingredients.length * 0.20); // +20 cents per ingredient
        price *= this.quantity;

        return price.toFixed(2);
    }
}

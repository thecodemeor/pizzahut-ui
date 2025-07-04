import { Injectable } from '@angular/core';

// Query
import menuPizza from 'src/assets/content/pizza.json'
import menuBeverage from 'src/assets/content/beverage.json'

@Injectable({
    providedIn: 'root'
})
export class MenuService {

    pizzas: any[] = []
    pizzaAll() {
        this.pizzas = []
        for ( const pizza of menuPizza ) {
            this.pizzas.push( pizza )
        }
        return this.pizzas
    }

    pizzaHit() {
        this.pizzas = []
        for ( const pizza of menuPizza ) {
            if ( pizza.status.includes( 'hit' )) {
                this.pizzas.push( pizza );
            }
        }
        return this.pizzas
    }

    pizzaNew() {
        this.pizzas = []
        for ( const pizza of menuPizza ) {
            if ( pizza.status.includes( 'new' )) {
                this.pizzas.push( pizza );
            }
        }
        return this.pizzas
    }

    pizzaMeat() {
        this.pizzas = []
        for ( const pizza of menuPizza ) {
            const hasSalmon = pizza.ingredients.includes( 'salmon' );
            const hasShrimp = pizza.ingredients.includes( 'shrimp' );

            if ( !hasSalmon && !hasShrimp ) {
                this.pizzas.push( pizza );
            }
        }
        return this.pizzas
    }

    pizzaMarine() {
        this.pizzas = []
        for ( const pizza of menuPizza ) {
            const hasBeef = pizza.ingredients.includes( 'beef' );
            const hasChicken = pizza.ingredients.includes( 'chicken' );

            if ( !hasBeef && !hasChicken ) {
                this.pizzas.push( pizza );
            }
        }
        return this.pizzas
    }

    pizzaVege() {
        this.pizzas = []
        for ( const pizza of menuPizza ) {
            const hasSalmon = pizza.ingredients.includes( 'salmon' );
            const hasShrimp = pizza.ingredients.includes( 'shrimp' );
            const hasBeef = pizza.ingredients.includes( 'beef' );
            const hasChicken = pizza.ingredients.includes( 'chicken' );
            const hasCapsicum = pizza.ingredients.includes( 'capsicum' );
            const hasTomato = pizza.ingredients.includes( 'tomato' );
            const hasPineapples = pizza.ingredients.includes( 'pineapple' );
            const hasMushroom = pizza.ingredients.includes( 'mushroom' );
            const hasChilli = pizza.ingredients.includes( 'chilli' );
            const hasOlive = pizza.ingredients.includes( 'olive' );
            const hasOnion = pizza.ingredients.includes( 'onion' );
            const hasCherryTomato = pizza.ingredients.includes( 'cherry tomato' );
            const hasBasilLeaf = pizza.ingredients.includes( 'basil leaf' );
            const hasRosemaryLeaf = pizza.ingredients.includes( 'rosemary leaf' );

            if (
                !hasSalmon &&
                !hasShrimp &&
                !hasBeef &&
                !hasChicken &&
                hasCapsicum &&
                hasTomato &&
                hasPineapples &&
                hasMushroom &&
                hasChilli &&
                hasOlive &&
                hasOnion &&
                hasCherryTomato &&
                hasBasilLeaf &&
                hasRosemaryLeaf
            ) {
                this.pizzas.push( pizza );
            }
        }
        return this.pizzas
    }

    pizzaNoVege() {
        this.pizzas = []
        for ( const pizza of menuPizza ) {
            const hasCapsicum = pizza.ingredients.includes( 'capsicum' );
            const hasTomato = pizza.ingredients.includes( 'tomato' );
            const hasPineapples = pizza.ingredients.includes( 'pineapple' );
            const hasMushroom = pizza.ingredients.includes( 'mushroom' );
            const hasChilli = pizza.ingredients.includes( 'chilli' );
            const hasOlive = pizza.ingredients.includes( 'olive' );
            const hasOnion = pizza.ingredients.includes( 'onion' );
            const hasCherryTomato = pizza.ingredients.includes( 'cherry tomato' );
            const hasBasilLeaf = pizza.ingredients.includes( 'basil leaf' );
            const hasRosemaryLeaf = pizza.ingredients.includes( 'rosemary leaf' );

            if (
                !hasCapsicum &&
                !hasTomato &&
                !hasPineapples &&
                !hasMushroom &&
                !hasChilli &&
                !hasOlive &&
                !hasOnion &&
                !hasCherryTomato &&
                !hasBasilLeaf &&
                !hasRosemaryLeaf
            ) {
                this.pizzas.push( pizza );
            }
        }
        return this.pizzas
    }

    pizzaSpicy() {
        this.pizzas = []
        for ( const pizza of menuPizza ) {
            const hasSpicy = pizza.ingredients.includes( 'chilli' );

            if ( hasSpicy ) {
                this.pizzas.push( pizza );
            }
        }
        return this.pizzas
    }

    beverage: any[] = []
    beverageAll() {
        return this.beverage = menuBeverage
    }
}
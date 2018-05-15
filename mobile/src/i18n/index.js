/**
 *
 * Internationalization made like a douchbag. It will have to be done better in the future.
 * I didn't have the motivation to make it properly for now.
 *
 */

const LANGUAGE = 'en';

export function translate(key) {
 return translations[key] || key;
}

const translations = {
  en: {
    login: 'Log In',
    logout: 'Log out',
    forgot_password: 'You don\'t have access to your account anymore?',

    // Globals
    yes: 'Yes',
    cancel_sign_up: 'Cancel sign up',
    email: 'E-mail address',
    password: 'Password',
    sign_in: 'Sign in !',
    sign_up: 'Create an account',

    //Sign up translations
    whats_your_name: 'What\'s your name ?',
    first_name: 'First name',
    last_name: 'Last name',
    are_you_major: 'Are you major ?',
    e_cig_forbidden: 'According to Article L3511-2-1, it is forbidden to sell electronic vaping devices or refill bottles to minors.',

    choose_your_store: 'Choose your store !',
    change_your_store_later: 'In the future, if you wish to change your store, go your account\'s settings',
    finish_sign_up: 'Finalize your sign up',
    hard_password: 'Make sure your password will be hard to find, even for a relative or a friend of yours',
    thanks_trust: 'Thanks for your trust !',
    gathering_articles: 'Gathering articles...',

    //Home translations
    hello: 'Hello',
    best_sales: 'Best-selling products',
    new_products: 'New products',
    add_to_cart: 'Add to cart',
    your_last_order: 'Your last order',
    replace_with_cart: 'Replace with cart',
    merge_with_cart: 'Merge with cart',

    // Browse translations
    know_what_you_want: 'Do you know what you\'re looking for ?',
    find_your_product: 'Find your product',

    //Search translations
    what_you_looking_for: 'What are you looking for ?',
    reinitialize: 'Reinitialize',
    your_results: 'Your results',

    // Cart translations
    your_cart: 'Your cart',
    continue: 'Continue',
    see_product: 'See the product',
    remove_product: 'Remove the product',
    sub_total: 'Sub total',
    total_price: 'Total price',

    // Filters translations
    our_brands: 'Our brands',
    our_categories: 'Our categories',
    our: 'Our',

    // Products list translations
    filter: 'Filter',

    //Product translations
    no_longer_available_options: 'This product is no longer available in:',

    //Recap translations
    summary: 'Summary',
    your_order: 'Your order',
    when_take_order: 'When do you wish to come and get your order ?',
    finish_order: 'Finalize your order',
    accept_gtc: 'By validating your order, you accept the integrality of our GTC, and our personal information politic management',
    total_excl_tax: 'Total (excl tax)',
    total_incl_tax: 'Total (incl tax)',
    total_vat: 'Total VAT',

  },
  fr: {
    login: 'Connexion',
    logout: 'Se déconnecter',
    forgot_password: 'Vous n\'avez plus accès à votre compte ?',

    // Globals
    yes: 'Oui',
    email: 'Addresse email',
    password: 'Mot de passe',
    sign_in: 'Connectez-vous !',
    sign_up: 'Créer un compte',

    //Sign up translations
    whats_your_name: 'Comment vous appelez-vous ?',
    first_name: 'Prénom',
    last_name: 'Nom',
    are_you_major: 'Êtes vous majeur ?',
    e_cig_forbidden: 'Selon l’article L3511-2-1, il est interdit de vendre des dispositifs électroniques de vapotage ou des flacons de recharge à des mineurs.',
    cancel_sign_up: 'Annuler l\'inscription',

    choose_your_store: 'Choisissez votre boutique !',
    change_your_store_later: 'A l’avenir si vous souhaitez changer de boutique, rendez-vous dans vos paramètres de compte.',
    finish_sign_up: 'Finalisez votre inscription',
    hard_password: 'Faites en sorte que votre mot de passe soit impossible à deviner, même pour un membre de votre famille ou un ami(e)',
    thanks_trust: 'Merci de votre confiance !',
    gathering_articles: 'Récupération des articles...',

    //Home translations
    hello: 'Bonjour',
    best_sales: 'Les meilleures ventes',
    new_products: 'Les nouveautés',
    add_to_cart: 'Ajouter au panier',
    your_last_order: 'Votre dernière commande',
    replace_with_cart: 'Remplacer le panier',
    merge_with_cart: 'Fusionner avec le panier',

    // Browse translations
    know_what_you_want: 'Vous savez ce que vous voulez ?',
    find_your_product: 'Trouvez votre produit',

    //Search translations
    what_you_looking_for: 'Que cherchez vous ?',
    reinitialize: 'Réinitialiser',
    your_results: 'Vos résultats',

    // Cart translations
    your_cart: 'Votre panier',
    continue: 'Continuer',
    see_product: 'Voir le produit',
    remove_product: 'Retirer le produit',
    sub_total: 'Sous-total',
    total_price: 'Montant total',

    // Filters translations
    our_brands: 'Nos marques',
    our_categories: 'Nos catégories',
    our: 'Our',


    // Products list translations
    filter: 'Filtrer',


    //Product translations
    no_longer_available_options: 'Ce produit n\'est plus disponible en:',

    //Recap translations
    summary: 'Récapitulatif',
    your_order: 'Votre commande',
    when_take_order: 'Quand souhaitez-vous récupérer votre commande ?',
    finish_order: 'Finalisez votre commande',
    accept_gtc: 'En validant votre commande, vous acceptez l’intégralité de nos CGV ainsi que notre politique de gestion de vos informations personnelles.',
    total_excl_tax: 'Total HT',
    total_incl_tax: 'Total TTC',
    total_vat: 'Total TVA',

  }
}[LANGUAGE];

export default translations;

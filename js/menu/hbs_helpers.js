var acumulador = 0
var contador = 0
var subtotal = 0
var promoEspecial = sessionStorage.getItem('Promo') | 0

var costoEnvio = 0
var descuento = 0

Handlebars.registerHelper('reseteo', function() {
    acumulador = 0
    contador = 0
});    


Handlebars.registerHelper('substring', function( string, start, end ) {
    var theString = string.substring( start ,end );

    if( string.length > end ) {
        theString += '...';
    }

    return new Handlebars.SafeString(theString);
});

Handlebars.registerHelper('ayudante', function( este ) {
    // console.log(este)
});

Handlebars.registerHelper('ajusteEval', function( evaluacion, evaluadores ) {
        if( evaluacion > 5 ) {
            valor = 5
        } else {valor = evaluacion }
        var theString = 'class="card__content-value card__content-value_' + valor +'"'
    return new Handlebars.SafeString(theString);
});



Handlebars.registerHelper('ajusteMoneda', function(importe) {
    var subtotal = importe * 1
    var enMoneda = subtotal.toLocaleString('es-ar', {
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: 2
    });
    return new Handlebars.SafeString(enMoneda);
});

Handlebars.registerHelper('ajusteST', function( precio, cantidad ) {
        subtotal = precio * cantidad
        acumulador += subtotal
        contador += cantidad

        // console.log(subtotal, acumulador, contador)
        var resultado = subtotal.toLocaleString('es-ar', {
            style: 'currency',
            currency: 'ARS',
            minimumFractionDigits: 2
        });
    return new Handlebars.SafeString(resultado);
    
});

Handlebars.registerHelper('acumulador', function() {
        var resultado = acumulador.toLocaleString('es-ar', {
            style: 'currency',
            currency: 'ARS',
            minimumFractionDigits: 2
        });
    return new Handlebars.SafeString(resultado);
});

Handlebars.registerHelper('contador', function( ) {
    return new Handlebars.SafeString(contador);
});

Handlebars.registerHelper('calculoEnvio', function( ) {
        if( acumulador > 7500 ) {
            valor = 0
        } else {valor = 990 }
        
        costoEnvio = valor
        var theString = valor.toLocaleString('es-ar', {
            style: 'currency',
            currency: 'ARS',
            minimumFractionDigits: 2
        });
    
        return new Handlebars.SafeString(theString);
});


Handlebars.registerHelper('calculoPromocion', function(declarPromo ) {
    // if( acumulador > 7500 ) {
    //     valor = 0
    // } else {valor = 990 }
    
    sessionStorage.setItem('Promo', declarPromo)
    sessionStorage.setItem('PromoValor', '0.15')
    
    descuento = acumulador*promoEspecial

    var theString = descuento.toLocaleString('es-ar', {
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: 2
    });

    return new Handlebars.SafeString(theString);
});

Handlebars.registerHelper('total', function() {
    
    var ImporteFinal = acumulador + costoEnvio - descuento

    var theString = ImporteFinal.toLocaleString('es-ar', {
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: 2
    });

    return new Handlebars.SafeString(theString);
});


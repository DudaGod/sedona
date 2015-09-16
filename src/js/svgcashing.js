/**
 * @description  http://osvaldas.info/caching-svg-sprite-in-localstorage
 */

;( function( window, document )
{
  'use strict';

  var file     = '../img/svg-icons.svg',
      revision = 2;

  if( !document.createElementNS || !document.createElementNS( 'http://www.w3.org/2000/svg', 'svg' ).createSVGRect )
      return true;

  var isLocalStorage = supports_html5_storage(),
      request,
      data,
      insertIT = function()
      {
          document.body.insertAdjacentHTML( 'afterbegin', data );
      },
      insert = function()
      {
          if( document.body ) insertIT();
          else document.addEventListener( 'DOMContentLoaded', insertIT );
      };

  if( isLocalStorage && localStorage.getItem( 'inlineSVGrev' ) == revision )
  {
      data = localStorage.getItem( 'inlineSVGdata' );
      if( data )
      {
          insert();
          return true;
      }
  }

  try
  {
      request = new XMLHttpRequest();
      request.open( 'GET', file, true );
      request.onload = function()
      {
          if( request.status >= 200 && request.status < 400 )
          {
              data = request.responseText;
              insert();
              if( isLocalStorage )
              {
                  localStorage.setItem( 'inlineSVGdata',  data );
                  localStorage.setItem( 'inlineSVGrev',   revision );
              }
          }
      }
      request.send();
  }
  catch( e ){}

}( window, document ) );

function supports_html5_storage() {
  try {
    return 'localStorage' in window && window['localStorage'] !== null;
} catch (e) {
    return false;
  }
}
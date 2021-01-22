//Слайдер на главной
$(window).load(function(){         
  $('.flexslider').flexslider({             
    animation: "fade", 
    randomize: true,
    smoothHeight: true,
    start: function(slider){                 
      $('body').removeClass('loading');           
    }         
  });     
});

//Блоки в подвале, скрывающиеся и раскрывающиеся по клику (на мобильных устройствах)
$('document').ready(function(){
  $('.open-close-footer').click(function(){
      var ww = $(window).width();
      if (ww < 480){
          $(this).parent().toggleClass('unfold');
          $(this).parent().children('.block_content').toggleClass('unfold');
          return false;
      }
  });
});

// Serialscroll исключает ошибку выбора
function serialScrollFixLock(event, targeted, scrolled, items, position)
{
  serialScrollNbImages = $('#thumbs_list li:visible').length;
	serialScrollNbImagesDisplayed = 3;

	var leftArrow = position == 0 ? true : false;
	var rightArrow = position + serialScrollNbImagesDisplayed >= serialScrollNbImages ? true : false;

	$('#view_scroll_left').css('cursor', leftArrow ? 'default' : 'pointer').css('display', leftArrow ? 'none' : 'block').fadeTo(0, leftArrow ? 0 : 1);
	$('#view_scroll_right').css('cursor', rightArrow ? 'default' : 'pointer').fadeTo(0, rightArrow ? 0 : 1).css('display', rightArrow ? 'none' : 'block');
	return true;
}

// Изменение изображения товара относительно уже выбранного
function refreshProductImages(id_product_attribute)
{
	$('#thumbs_list_frame').scrollTo('li:eq(0)', 700, {axis:'x'});

	id_product_attribute = parseInt(id_product_attribute);

        if (id_product_attribute > 0 && typeof(combinationImages) != 'undefined' && typeof(combinationImages[id_product_attribute]) != 'undefined')
	{
                $('#thumbs_list li').hide();
		$('#thumbs_list').trigger('goto', 0);
		for (var i = 0; i < combinationImages[id_product_attribute].length; i++)
			$('#thumbnail_' + parseInt(combinationImages[id_product_attribute][i])).show();
	
		if (parseInt($('#thumbs_list_frame >li:visible').length) < parseInt($('#thumbs_list_frame >li').length))
			$('#wrapResetImages').show('slow');
		else
			$('#wrapResetImages').hide('slow');
	}
	else
	{
		$('#thumbs_list li').show();
		if (parseInt($('#thumbs_list_frame >li').length) == parseInt($('#thumbs_list_frame >li:visible').length))
                $('#wrapResetImages').hide('slow');
	}
        
        var thumb_width = $('#thumbs_list_frame >li').width() + parseInt($('#thumbs_list_frame >li').css('marginRight')) + parseInt($('#thumbs_list_frame >li').css('marginLeft'));
	$('#thumbs_list_frame').width((parseInt((thumb_width) * $('#thumbs_list_frame >li').length)) + 'px');
	$('#thumbs_list').trigger('goto', 0);
	serialScrollFixLock('', '', '', '', 0);// SerialScroll Bug on goto 0 ?
}

//Карусель изображений товара
$(document).ready(function()
{
	$('#thumbs_list').serialScroll({
		items:'li:visible',
		prev:'#view_scroll_left',
		next:'#view_scroll_right',
		axis:'x',
		offset:0,
		start:0,
		stop:true,
		onBefore:serialScrollFixLock,
		duration:700,
		step: 2,
		lazy: true,
		lock: false,
		force:false,
		cycle:false
	});

	$('#thumbs_list').trigger('goto', 1);
	$('#thumbs_list').trigger('goto', 0);
});

// Устанавливаем правильную высоту для карусели
function setCarouselHeight() {
  // Проходим по всем каруселям на странице
  $('div.autumnshowcase_carousel').each(function(i){
    // Вычисление максимальной высоты блока карусели
    var maxheight = 0;
    // текущий размер блока с каруселью
    var currentFullCarouselWidth = $(this).width();
    // находим все элементы в каждой карусели
    var li = $(this).find('li');
    // Если в карусели есть элементы по которым её следует подровнять
    if(li.length) {
      // Текущая ширина блока с товаром
      var currentCarouselItemWidth = $(li.get(0)).width();
    
      li.each(function(i){
        var h = parseInt($(this).height());
        if(h > maxheight) {
          maxheight = h;
        }
      });
      
      // Проставляем правильную высоту для каруселей, чтобы пространство на странице использовалось максимально эффективно
      $(this).css('height', maxheight + 'px');
      
      var step = parseInt(currentFullCarouselWidth / currentCarouselItemWidth);
      // Изменяем число прокрутки для текущего размера карусели
      $('.carousel_prev').jcarouselControl({
    		target: '-=' + step
    	});
    	$('.carousel_next').jcarouselControl({
    		target: '+=' + step
    	});
    }
  });
}


$(window).resize(function(){
  $('#image-block').height($('#small_pic').height());
  setCarouselHeight();
});

//Карусель товаров на главной, новинок, избранных и сопутствующих товаров
$(document).ready(function(){
  $('.autumnshowcase_carousel').jcarousel({
  	'wrap': 'circular'
	})
  .jcarouselAutoscroll({
		interval: '5000',
    autostart: false
	});
    
	$('.carousel_prev').jcarouselControl({
		target: '-=1'
	});
	$('.carousel_next').jcarouselControl({
		target: '+=1'
	});
	$('.featured_products .autumnshowcase_carousel').touchwipe({
		wipeLeft: function() {
		   $('.featured_products .carousel_next').click();
		},
		wipeRight: function() {
		   $('.featured_products .carousel_prev').click();
		},
		preventDefaultEvents: false
	});
	$('.new_products .autumnshowcase_carousel').touchwipe({
		wipeLeft: function() {
		   $('.new_products .carousel_next').click();
		},
		wipeRight: function() {
		   $('.new_products .carousel_prev').click();
		},
		preventDefaultEvents: false
	});
	$('.special_products .autumnshowcase_carousel').touchwipe({
		wipeLeft: function() {
		   $('.special_products .carousel_next').click();
		},
		wipeRight: function() {
		   $('.special_products .carousel_prev').click();
		},
		preventDefaultEvents: false
	});

  $('#productscategory_list').jcarousel({
      'wrap': 'circular'
  });

  $('.blockproductscategory #productscategory_list').touchwipe({
		wipeLeft: function() {
		   $('.blockproductscategory .carousel_next').click();
		},
		wipeRight: function() {
		   $('.blockproductscategory .carousel_prev').click();
		},
		preventDefaultEvents: false
	});
  
  $('#qty-button-up').click(function(){
    var currentVal = parseInt($('#qty').val());
    if (!isNaN(currentVal)){
        $('#qty').val(currentVal + 1);
        $('#qty').trigger('keyup');
    }
    return false;
  });
  $('#qty-button-down').click(function(){
    var currentVal = parseInt($('#qty').val());
    if (!isNaN(currentVal) && !(currentVal <= 1) ){
        $('#qty').val(currentVal - 1);
        $('#qty').trigger('keyup');
    }
    return false;
  });
  
  
  // Запускаем установку правильной высоты для карусели на главной спустя 10 сотых секунды (кэш картинки загрузятся и установят размеры)
  setTimeout(function() { setCarouselHeight(); }, 100);
  // Запускаем установку правильной высоты для карусели на главной спустя 30 сотых секунды поправим размеры
  setTimeout(function() { setCarouselHeight(); }, 300);
  // Запускаем установку правильной высоты для карусели на главной спустя 1 секунду поправим размеры более точно
  setTimeout(function() { setCarouselHeight(); }, 1000);
  // Запускаем установку правильной высоты для карусели на главной спустя 3 секунды поправим размеры ещё более точно.
  setTimeout(function() { setCarouselHeight(); }, 3000);
  
});

$(function(){
  
  var $container = $('.grid, .product-list3');
  var lastPage = 1;
  // Скрываем навигацию по умолчанию
  $('.pagination').hide();

  $container.infinitescroll({
    navSelector  : '.infinitescroll-pages',    // класс элемента постраничной навигации для бесконечного скрола
    nextSelector : '.infinitescroll-pages a',  // класс элемента постраничной навигации, ссылка на следующую страницу
    itemSelector : '.elem, .category-info',     // класс элементов, которые будем извлекать
    loading: {
      msgText: 'Пожалуйста подождите...',
      finishedMsg: 'Больше нет товаров.',
      img: zoomloaderPath ? zoomloaderPath : '/zoomloader.gif'
    }
    }, function(newElements) {
      var $newElems = $( newElements ).css({ opacity: 0 });
      $newElems.imagesLoaded(function(){
        $newElems.animate({ opacity: 1 });
        $container.masonry( 'appended', $newElems, true );
      });
      lastPage++;
      // если это последняя страница, завершаем работу
      if(lastPage >= (infiniteScrollLastPage ? infiniteScrollLastPage : 1) ){
        $container.infinitescroll('pause');
      }
    }
  );

});

//Кнопка "ВВЕРХ"
$(function() {  
  $.fn.scrollToTop = function() {   
    $(this).hide().removeAttr("href");   
    if ($(window).scrollTop() >= "250") 
      $(this).fadeIn("slow")   
    var scrollDiv = $(this);   
    $(window).scroll(function() {    
      if ($(window).scrollTop() <= "250") 
        $(scrollDiv).fadeOut("slow")    
      else 
        $(scrollDiv).fadeIn("slow")   
    });   
    $(this).click(function() {    
        $("html, body").animate({scrollTop: 0}, "slow")   
      })      
  }  
}); 

$(function() {  
  $("#Go_Top").scrollToTop(); 
});

// Меню-аккардеон. Каталог
jQuery(document).ready(function () {
	
	jQuery("ul.accordion li.parent").each(function(){
        jQuery(this).append('<em class="open-close">&nbsp;</em>');
      });
	
	jQuery('ul.accordion').accordion();
	
	jQuery("ul.accordion li.active").each(function(){
		jQuery(this).children().next("ul").css('display', 'block');
	});
  
  jQuery("ul.accordion_main li.parent").each(function(){
        jQuery(this).append('<em class="open-close">&nbsp;</em>');
      });
  
	jQuery('ul.accordion_main').accordion();
	
	jQuery("ul.accordion_main li.active").each(function(){
		jQuery(this).children().next("ul").css('display', 'block');
	});
});

// Инициализация табов на странице товара
function initTabs() {
  // Блок в котором находятся табы
  var tabBlock = $('#more_info_block');
  if(!tabBlock.length) {
    return false;
  }
  // По умолчанию делаем отметку о том что активного таба не найдено
  var isFind = 0;
  tabBlock.find('.idTabs li > a').each(function(i){
    // Если нашёлся активный там
    if($(this).hasClass('selected')) {
      // Инициализируем найденный таб
      $(this).click();
      // Ставим отметку, о том что не нужно инициализировать первый таб на странице
      isFind = 1;
    }
  });
  // Если не найдено ни одного таба с отметкой о том что он активен
  if(!isFind) {
    // Ставим активным первый таб на странице.
    tabSwitch(1);
  }
  // Проверяет хэш и если по нему была открыта вкладка, то эта функция автоматически откроет её.
  checkTabHash();

  // Биндим изменение хэша - проверка какой FAQ вопрос нужно открыть.
  $(window).bind('hashchange', function() { checkTabHash(); });
}

// Проверяет хэш, переданый пользователем и открывает соответствующий раздел
function checkTabHash() {

  // Определяем текущий хэш страницы
  var hash = window.location.hash.substr(1);

  if(hash == 'goodsDataOpinionAdd') {
    // $('#goodsDataOpinionAddBlock').show('blind');
    return false;
  }

  if(!hash.length || hash.indexOf('show_tab_') == -1) {
    return false;
  }

  // Открываем тот таб, который был указан в hash-е
  tabSwitch(hash.replace("show_tab_", ''))
}

// Выбор вкладки на странице товара
function tabSwitch(nb) {
  var tabBlock = $('#more_info_block');
  tabBlock.find('.idTabs li > a').removeClass('selected');
  tabBlock.find('div.content').hide();
  $('#tab_' + nb).addClass('selected');
  $('#idTab' + nb).show();
  // Записываем в хэш информацию о том какой таб сейчас открыт, для возможности скопировать и передать ссылку с открытым нужным табом
  document.location.hash = "#show_tab_" + nb;
}

// Инициализируем табы на странице
$(function() { initTabs(); });
  
// Отправляет ошибку на сервер, для того чтобы служба тех поддержки могла разобраться в проблеме как можно быстрее.
function sendError (desc, page, line) {
  var img=document.createElement('img');
  img.src = 'https://storeland.ru/error/js?desc='+encodeURIComponent(desc)+'&page='+encodeURIComponent(window.location)+'&line=0';
  img.style.position = 'absolute';
  img.style.top = '-9999px';

  try { document.getElementsByTagName('head').appendChild(img) } catch (e){}
  return false;
}

// Форматирует цену
function number_format(number,decimals,dec_point,thousands_sep){var n=number,prec=decimals;var toFixedFix=function(n,prec){var k=Math.pow(10,prec);return(Math.round(n*k)/k).toString();};n=!isFinite(+n)?0:+n;prec=!isFinite(+prec)?0:Math.abs(prec);var sep=(typeof thousands_sep==='undefined')?',':thousands_sep;var dec=(typeof dec_point==='undefined')?'.':dec_point;var s=(prec>0)?toFixedFix(n,prec):toFixedFix(Math.round(n),prec);var abs=toFixedFix(Math.abs(n),prec);var _,i;if(abs>=1000){_=abs.split(/\D/);i=_[0].length%3||3;_[0]=s.slice(0,i+(n<0))+
_[0].slice(i).replace(/(\d{3})/g,sep+'$1');s=_.join(dec);}else{s=s.replace('.',dec);}
var decPos=s.indexOf(dec);if(prec>=1&&decPos!==-1&&(s.length-decPos-1)<prec){s+=new Array(prec-(s.length-decPos-1)).join(0)+'0';}
else if(prec>=1&&decPos===-1){s+=dec+new Array(prec).join(0)+'0';}
return s;}

// Превращает поле пароля в текстовое поле и обратно
// @LinkObject - ссылка по которой кликнули
// @InputObject - объект у которого нужно изменить тип поля
function ChangePasswordFieldType (LinkObject, InputObject) {
  var 
    // Ссылка по которой кликнули
    LObject = $(LinkObject),
    // Объект у которого изменяем тип с password на text
    IObject = $(InputObject),
    // Старый текст ссылки
    txtOld = LObject.text(),
    // Новый текст ссылки
    txtNew = LObject.attr('rel');

  // Если объекты не получены, завершим работу функции
  if( LObject.length==0 || IObject.length==0 ) {
    return false;
  }

  // Изменяем у ссылки текст со старого на новый
  LObject.html(txtNew);
  // Старый текст ссылки сохраняем в атрибуте rel 
  LObject.attr('rel', txtOld);

  // Изменяем тип input поля
  if(IObject[0].type == 'text') {
    IObject[0].type = 'password';
  } else {
    IObject[0].type = 'text';
  }
}

// Крутит изображение при обновлении картинки защиты от роботов
function RefreshImageAction(img,num,cnt) {
  if(cnt>13) {
    return false;
  }

  $(img).attr('src', $(img).attr('rel') + 'icon/refresh/' + num + '.gif');
  num = (num==6)?0:num;
  setTimeout(function(){RefreshImageAction(img, num+1, cnt+1);}, 50);
}

$(document).ready(function(){
  
  $("#header_shopping_cart").hover(
    function () {
      $("#cart_block").css("display","block");
    },
    function () {
      $("#cart_block").css("display","none");
    }
  );
  
  $("#cart_block").hover(
    function () {
      $(this).css("display","block");
    },
    function () {
      $(this).css("display","none");
    });
  
  // Кнопки на сайте если подгружен модуль Jquery.UI
  if(typeof($('input:submit, input.button').button) == "function" ) {
    $('input:submit, input.button').button();
  }

// Отправка формы по Ctrl+Enter
  $('form').bind('keypress', function(e){
    if((e.ctrlKey) && ((e.which==10)||(e.which==13))) {$(this).submit();}
  // Отправка данных формы по нажатию на Enter в случае если курсор находится в input полях (В некоторых браузерах при нажатии по enter срабатывает клик по первому submit полю, которое является кнопкой назад. Для этого написан этот фикс)
  }).find('input').bind('keypress', function(e){
    if(((e.which==10)||(e.which==13))) { try{$(this.form).submit();} catch(e){} return false; }
  });
  // Валидация формы на странице оформления заказа, а так же формы на страницы связи с администрацией
  $('.order form, .feedbackForm, .clientForm, .goodsDataOpinionAddForm, #quickform').submit(function(){
    if($(this).valid()) {
      // Кнопка отправки формы
      SubmitButton = $(this).find('input:submit, button:submit');
      // Если кнопку уже нажали, видимо отправка формы производилась по нажатию на кнопку enter, не допускаем этого.
      if($(SubmitButton.get(0)).attr('disabled')) {
        return false;
      }
      // Устанавливаем на кнопку отправки формы блокировку повторной оптравки
      SubmitButton.attr('disabled', true);
      // Через 10 секунд блокировка отправки формы снимается.
      setTimeout('SubmitButton.attr("disabled", false);', 10000);
    }
  }).validate();

  // В форме оформления заказа при клике на кнопку назад просто переходим на предыдущую страницу
  $('.order form input:submit[name="toprev"]').click(function(){
    var act = this.form.action;
    this.form.action = act + ( act.indexOf( '\?' ) > -1 ? '&' : '?' ) + 'toprev=1';
    this.form.submit();
    return false;
  });

  // Добавление товара в корзину через ajax
  $('.goodsListItemCatalogueAddToCartButton, .goodsToCartFromCompareForm').submit(function(){
    // Если нужно быстро положить в корзину
    if($(this).attr('rel') == 'quick') {
      return true;
    
    // Если нужно просто добавить в корзину и продолжить покупки
    } else {
      $(this).nyroModalManual({
        formIndicator: 'ajax_q',  // Value added when a form is sent
        minWidth: 420, // Minimum width
        minHeight: 150, // Minimum height
        gallery: null // Gallery name if provided
      });
      return false;
     }
  });
  
  // Клик по ячейке с изображением означает клик по картинке
  $('table.product-image td').click(function(){document.location = $(this).find('a:first').attr('href');return false;});

  // Главное товарное изображение
  $('.goodsDataMainImages a')
    // При наведении на маленькое изображение изменяем среднее
    .mouseover(function(){
      var
        // Путь к среднему изображению
        MediumImageUrl = $(this).find('img').attr('rel')

        // Объект в котором расположено среднее изображение товара
        ,MainImageObj = $('div.goodsDataMainImage')

        // Главное изображение, в которое будем вставлять новое изображение
        ,MainImageImg = MainImageObj.find('img')

        // Вариант главного изображения отображаемого через свойство background
        ,MainImageBlockWithBg = MainImageObj.find('a div')

        // В этом объекте хранится идентификатор картинки главного изображения для коректной работы галереи изображений
        ,MainImageIdObject = MainImageObj.find('input')

        // Получаем идентификатор этого изображения из соседнего input поля
        ,GoodsImageIconId = $(this).parent().find('input').val()
      ;

      // Изменяем главное изображение
      if(0 < MainImageImg.length) {
        MainImageImg.attr('src', MediumImageUrl);
      } else {
        MainImageBlockWithBg.css({'background': 'url("' + MediumImageUrl + '") no-repeat center center', 'background-size' : 'contain'});
      }

      // Изменяем идентификатор главного изображения
      MainImageIdObject.val(GoodsImageIconId);
    })
    // Изменение главного изображения товара при нажатии на миниатюру
    .click(function(){
      // Для иконки изображения запустим галерею
      $(this).nyroModalManual();
      return false;
    });

  // Функция собирает свойства в строку, для определения модификации товара
  function getSlugFromGoodsDataFormModificationsProperties(obj) {
    var properties = new Array();
    $(obj).each(function(i){
      properties[i] = parseInt($(this).val());
    });
    return properties.sort(function(a,b){return a - b}).join('_');
  }


  var
  // Запоминаем поля выбора свойств, для ускорения работы со значениями свойств
    goodsDataProperties = $('div.goodsDataMainModificationsBlock select[name="form[properties][]"]'),

  // Запоминаем блоки с информацией по модификациям, для ускорения работы
    goodsDataModifications = $('div.goodsDataMainModificationsList');

  // Обновляет возможность выбора свойств модификации, для отключения возможности выбора по характеристикам модификации которой не существует.
  function updateVisibility (y) {
    // Проверяем в каждом соседнем поле выбора модификаций, возможно ли подобрать модификацию для указанных свойств
    goodsDataProperties.each(function(j){
      // Если мы сравниваем значения свойства не с самим собой, а с другим списком значений свойств
      if( j != y ) {
        // Проходим по всем значениям текущего свойства модификации товара
        $(this).find('option').each(function(){
          // Записываем временный массив свойств, которые будем использовать для проверки существования модификации
          var checkProperties = new Array();
          $(goodsDataProperties).each(function(i){
            checkProperties[i] = parseInt($(this).val());
          });
          // Пытаемся найти модификацию соответствующую выбранным значениям свойств
          checkProperties[j] = parseInt($(this).attr('value'));
          // Собираем хэш определяющий модификацию по свойствам
          slug = checkProperties.sort(function(a,b){return a - b}).join('_');
          // Ищем модификацию по всем выбранным значениям свойств товара. Если модификации нет в возможном выборе, отмечаем потенциальное значение выбора как не доступное для выбора, т.к. такой модификации нет.
          if(!goodsDataModifications.filter('[rel="'+slug+'"]').length) {
            $(this).attr('disabled', true);
            // Если выбрав данное значение свойства товара можно подобрать модификацию, то выделяем вариант выбора как доступный.
          } else {
            $(this).attr('disabled', false);
          }
        });
      }
    });
  }
  // Обновляем возможность выбора модификации товара по свойствам. Для тех свойств, выбор по которым не возможен, отключаем такую возможность.
  // Проверяем возможность выбора на всех полях кроме первого, чтобы отключить во всех остальных варианты, которые не возможно выбрать
  updateVisibility (0);
  // Проверяем возможность выбора на всех полях кроме второго, чтобы в первом поле так же отключилась возможность выбора не существующих модификаций
  updateVisibility (1);

  // Изменение цены товара при изменении у товара свойства для модификации
  goodsDataProperties.each(function(y){
    $(this).change(function(){

      var slug = getSlugFromGoodsDataFormModificationsProperties(goodsDataProperties),
        modificationBlock             = goodsDataModifications.filter('[rel="'+slug+'"]'),
        modificationId                = parseInt(modificationBlock.find('[name="id"]').val()),
        modificationArtNumber         = modificationBlock.find('[name="art_number"]').val(),
        modificationPriceNow          = parseFloat(modificationBlock.find('[name="price_now"]').val()),
        modificationPriceNowFormated  = modificationBlock.find('.price_now_formated').html(),
        modificationPriceOld          = parseFloat(modificationBlock.find('[name="price_old"]').val()),
        modificationPriceOldFormated  = modificationBlock.find('.price_old_formated').html(),
        modificationRestValue         = parseFloat(modificationBlock.find('[name="rest_value"]').val()),
        modificationDescription       = modificationBlock.find('.description').html(),
        modificationMeasureId         = parseInt(modificationBlock.find('[name="measure_id"]').val()),
        modificationMeasureName       = modificationBlock.find('[name="measure_name"]').val(),
        modificationMeasureDesc       = modificationBlock.find('[name="measure_desc"]').val(),
        modificationMeasurePrecision  = modificationBlock.find('[name="measure_precision"]').val(),
        modificationIsHasInCompareList= modificationBlock.find('[name="is_has_in_compare_list"]').val(),
        goodsModificationId           = $('.goodsDataMainModificationId'),
        goodsPriceNow                 = $('.goodsDataMainModificationPriceNow'),
        goodsPriceOld                 = $('.goodsDataMainModificationPriceOld'),
        goodsAvailable                = $('.goodsDataMainModificationAvailable'),
        goodsAvailableTrue            = goodsAvailable.find('.available-true'),
        goodsAvailableFalse           = goodsAvailable.find('.available-false'),
        goodsArtNumberBlock           = $('.goodsDataMainModificationArtNumber'),
        goodsArtNumber                = goodsArtNumberBlock.find('span'),
        goodsCompareAddButton         = $('.goodsDataCompareButton.add'),
        goodsCompareDeleteButton      = $('.goodsDataCompareButton.delete'),
        goodsModDescriptionBlock      = $('.goodsDataMainModificationsDescriptionBlock');


      // Изменяем данные товара для выбранных параметров. Если нашлась выбранная модификация
      if(modificationBlock.length) {
        // Цена товара
        goodsPriceNow.html(modificationPriceNowFormated);

        // Старая цена товара
        if(modificationPriceOld>modificationPriceNow) {
          goodsPriceOld.html(modificationPriceOldFormated);
        } else {
          goodsPriceOld.html('');
        }

        // Есть ли товар есть в наличии
        if(modificationRestValue>0) {
          goodsAvailableTrue.show();
          goodsAvailableFalse.hide();
          // Если товара нет в наличии
        } else {
          goodsAvailableTrue.hide();
          goodsAvailableFalse.show();
        }
        // Если товар есть в списке сравнения
        if(modificationIsHasInCompareList>0) {
          goodsCompareAddButton.hide();
          goodsCompareDeleteButton.show();
          // Если товара нет в списке сравнения
        } else {
          goodsCompareAddButton.show();
          goodsCompareDeleteButton.hide();
        }

        // Покажем артикул модификации товара, если он указан
        if(modificationArtNumber.length>0) {
          goodsArtNumberBlock.show();
          goodsArtNumber.html(modificationArtNumber);
          // Скроем артикул модификации товара, если он не указан
        } else {
          goodsArtNumberBlock.hide();
          goodsArtNumber.html('');
        }

        // Описание модификации товара. Покажем если оно есть, спрячем если его у модификации нет
        if(modificationDescription.length > 0) {
          goodsModDescriptionBlock.show().html('<div>' + modificationDescription + '</div>');
        } else {
          goodsModDescriptionBlock.hide().html();
        }


        // Идентификатор товарной модификации
        goodsModificationId.val(modificationId);
      } else {
        // Отправим запись об ошибке на сервер
        sendError('no modification by slug '+slug);
        alert('К сожалению сейчас не получается подобрать модификацию соответствующую выбранным параметрам.');
      }

      // Обновляем возможность выбора другой модификации для текущих значений свойств модификации товара.
      updateVisibility(y);
    });
  });
  
  // Кнопка добавления товара на сравнение сравнения товаров
  $('.goodsDataCompareButton').click(function(){
    window.location.href = $(this).attr('rel') +
    ($(this).attr('rel').indexOf( '\?' ) > -1 ? '&' : '?') +
    'id='+
    $('.goodsDataMainModificationId').val()+
    '&from='+
    $('input[name="form[goods_from]"]').val();
    return false;
  });
  
  // Сравнение товаров. Увеличение изображение при клике на ссылку увеличения и открытие галереии с изображениями этого товара
  $('.CompareGoodsImageZoom').click(function(){

    // Галлерея фотографий для данной модификации товаров
    var galleryBlock = $('.galleryBlock' +  $(this).attr('rel')),

    // Главное изображение товара, которое сейчас стоит у товара
    galleryMainImage = $('.CompareGoodsImageMain' +  $(this).attr('rel')),

    // Изображение по которому нужно кликнуть в галлерее изображений
    ImageIngallery = galleryBlock.find('.CompareGoodsImageGallery'+galleryMainImage.attr('rel'));
    
    // Запускаем галлерею изображений от изображения товара, чтобы если например кликнули по гайке, то и открылись гайка, а не еще какой-либо изображение этого товара
    ImageIngallery.nyroModalManual({
      gallery: 'gallery' +  $(this).attr('rel')
    });

    return false;
  });
  
  // Сравнение товаров. Инвертирование свойств для сравнения товара
  $('.CompareCheckbox.invert').click(function(){
    var checked = true,
        checkboxes = $('.CompareCheckbox:not(.invert)');

    checkboxes.each(function(){
      if($(this).attr('checked')) {
        checked = false;
        return false;
      }
    });
    
    checkboxes.each(function(){
      $(this).attr('checked', checked);
    });
    
    $(this).attr('checked', checked);
  });
  
  // Сравнение товаров. Скрытие характеристик товара, которые выделил пользователь
  $('.CompareGoodsHideSelected').click(function(){

    $('.CompareGoodsTableTbodyComparisonLine').each(function(){
      var CheckedCheckbox = $(this).find('.CompareCheckbox:checked:not(.invert)');
      if(CheckedCheckbox.length>0) {
        $(this).hide();
      }
    });

    // отменяем выделение характеристик товаров
    $('.CompareCheckbox').attr('checked',false);

    return false;
  });
  
  // Сравнение товаров. Отображение скрытых характеристик товара
  $('.CompareGoodsShowAll').click(function(){
    $('.CompareGoodsTableTbodyComparisonLine:hidden').show();
    return false;
  });
  
  var
    // Минимальное значение цены для фильтра
    priceFilterMinAvailable = parseInt($('.goodsFilterPriceRangePointers .min').text())
    // Максимальное значение цены для фильтра
    ,priceFilterMaxAvailable = parseInt($('.goodsFilterPriceRangePointers .max').text())
    // Максимальное значение цены для фильтра
    ,priceSliderBlock = $('#goods-filter-price-slider')
    // Поле ввода текущего значения цены "От"
    ,priceInputMin = $( "#goods-filter-min-price" )
    // Поле ввода текущего значения цены "До"
    ,priceInputMax = $( "#goods-filter-max-price" )
    // Блок с кнопкой, которую есть смысл нажимать только тогда, когда изменялся диапазон цен.
    ,priceSubmitButtonBlock = $( ".goodsFilterPriceSubmit" )
  ;
  
  // Изменяет размер ячеек с ценой, т.к. у них нет рамок, есть смысл менять размеры полей ввода, чтобы они выглядили как текст
  function priceInputsChangeWidthByChars() {
    // Если есть блок указания минимальной цены
    if(priceInputMin.length) {
      priceInputMin.css('width', (priceInputMin.val().length*7 + 30) + 'px');
      priceInputMax.css('width', (priceInputMax.val().length*7 + 30) + 'px');
    }
  }
  
  // Слайдер, который используется для удобства выбора цены
  priceSliderBlock.slider({
    range: true,
    min: priceFilterMinAvailable,
    max: priceFilterMaxAvailable,
    values: [
           parseInt($('#goods-filter-min-price').val())
           ,parseInt($('#goods-filter-max-price').val())
    ],
    slide: function( event, ui ) {
           priceInputMin.val( ui.values[ 0 ] );
           priceInputMax.val( ui.values[ 1 ] );
           priceSubmitButtonBlock.show();
           priceInputsChangeWidthByChars();
    }
  });
  
  // При изменении минимального значения цены
  priceInputMin.keyup(function(){
    var newVal = parseInt($(this).val());
    if(newVal < priceFilterMinAvailable) {
           newVal = priceFilterMinAvailable;
    }
    priceSliderBlock.slider("values", 0, newVal);
    priceSubmitButtonBlock.show();
    priceInputsChangeWidthByChars();
  });
  
  // При изменении максимального значения цены
  priceInputMax.keyup(function(){
    var newVal = parseInt($(this).val());
    if(newVal > priceFilterMaxAvailable) {
           newVal = priceFilterMaxAvailable;
    }
    priceSliderBlock.slider("values", 1, newVal);
    priceSubmitButtonBlock.show();
    priceInputsChangeWidthByChars();
  });
  // Обновить размеры полей ввода диапазона цен
  priceInputsChangeWidthByChars();
  
  // Сравнение товаров. Верхняя навигация изменение фильтра на отображение всех характеристик товаров
  $('.CompareGoodsTableFilterShowAll').click(function(){
    $('.CompareGoodsTableFilterSelected').removeClass('CompareGoodsTableFilterSelected');
    $('.CompareGoodsTableTbodyComparisonLine:hidden').show();
    
    $(this).addClass('CompareGoodsTableFilterSelected');
    return false;
  });

  // Сравнение товаров. Фильтр в верхней навигации. Отображение только различающихся характеристик товара
  $('.CompareGoodsTableFilterShowOnlyDifferent').click(function(){
    $('.CompareGoodsTableFilterSelected').removeClass('CompareGoodsTableFilterSelected');
    $('.CompareGoodsTableTbodyComparisonLine:not(.same)').show();
    $('.CompareGoodsTableTbodyComparisonLine.same').hide();

    $(this).addClass('CompareGoodsTableFilterSelected');
    return false;
  });

  // Сравнение товаров. При наведении на строку сравнения, она выделяется цветом
  $('.CompareGoodsTableTbodyComparisonLine').hover(
    function () { $(this).addClass('hover'); }, 
    function () { $(this).removeClass('hover'); }
  );
  
  // При клике по строке выделяем свойство
  $('.CompareGoodsTableTbodyComparisonLine td:not(.ceil1)').click(function(){
    var CompareCheckbox = $(this).parent().find('.CompareCheckbox');

    if(CompareCheckbox.attr('checked')) {
      CompareCheckbox.attr('checked', false);
    } else {
      CompareCheckbox.attr('checked', true);
    }
  });
  
  // Прокрутка списка сравнения вправо
  $('.CompareGoodsTablePrev').click(function(){
    
    return false;
  });

  function compareGetVars () {
    return new Array(
      $('.CompareGoodsTableTbody tr:first td').length - 1,
      parseInt($('.CompareGoodsTableTbody tr:first td:visible:not(.ceil1)').attr('class').replace(new RegExp('noBorderBottom compare\-td compare\-td\-'), '')),
      parseInt($('.CompareGoodsTableTbody tr:first td:visible:last').attr('class').replace(new RegExp('noBorderBottom compare\-td compare\-td\-'), ''))
    );
  }
  // Прокрутка списка сравнения вправо
  $('.CompareGoodsTableNext').click(function(){
    
    // Определяем используемые поля
    var data = compareGetVars(); 
      
    // Изменяем их если это возможно.
    if(data[0] > data[2]) {
      $('.compare-td-' + data[1]).hide();
      $('.compare-td-' + (data[2] + 1)).show();
      if((data[2] + 1) >= data[0]) {
        $(this).find('a').addClass('disable');
      }
      if(data[1] + 1 != 1) {
        $('.CompareGoodsTablePrev a').removeClass('disable');
      }
    }
    
    return false;
  });
  
  // Прокрутка списка сравнения вправо
  $('.CompareGoodsTablePrev').click(function(){
    
    // Определяем используемые поля
    var data = compareGetVars(); 
    
    // Изменяем их если это возможно.
    if(1 < data[1]) {
      $('.compare-td-' + (data[1] - 1)).show();
      $('.compare-td-' + data[2]).hide();
      if((data[1] - 1) <= 1) {
        $(this).find('a').addClass('disable');
      }
      if(data[2] - 1 != data[0]) {
        $('.CompareGoodsTableNext a').removeClass('disable');
      }
    }
    
    return false;
  });


  // Форма регистрации нового пользователя, действие ссылки "показать пароль"
  $('.clientForm .showPass').click(function(){
    ChangePasswordFieldType(this, $('#sites_client_pass'));
    return false;
  });
  
  // Форма регистрации нового пользователя, при оформлении заказа
  $('.OrderShowPass').click(function(){
    ChangePasswordFieldType(this, $('#contactPassWord'));
    return false;
  });
  
  // При оформлении заказа дадим возможность зарегистрироваться пользователю
  $('#contactWantRegister').click(function(){
    if($(this).attr("checked")) {
      $('.contactRegisterNeedElement').show();
      $('#contactEmail, #contactPassWord').addClass('required');
    } else {
      $('.contactRegisterNeedElement').hide();
      $('#contactEmail, #contactPassWord').removeClass('required');
    }
  });

  // Добавление отзыва о товаре. Рейтинг
  if(typeof($('.goodsDataOpinionTableRating').rating) == "function" ) {
    $('.goodsDataOpinionTableRating input').rating({
      split: 2,
      required: true
    });
  }
  
  // Иконки оплаты, чтобы яша не думал что тут сидят говносайто дельцы, размещающие по 30 бесполезных ссылок с главной сделаем ссылку яваскриптной
  $('.payment-sistems a').click(function(){ 
    document.location = '/order/stage/contacts';
    return false;
  });

  
  // Список отзывов о товаре. Ссылка на отображение формы для добавление отзыва о товаре
  $('body').on('click', '.goodsDataOpinionShowAddForm', function(){
    if(0 == $('#goodsDataOpinionAddBlock:visible').length) {
      $('#goodsDataOpinionAddBlock').show();
    } else {
      $('#goodsDataOpinionAddBlock').hide();
    }
    return false;
  });

  // Добавление отзыва о товаре. кнопка reset скрывающая форму добавления отзыва о товаре
  $('.goodsDataOpinionFormReset').click(function(){
    $('#goodsDataOpinionAddBlock').hide('blind');
    return false;
  });

  // Иконка для обновления изображение капчи
  $('.goodsDataOpinionCaptchaRefresh').click(function(){
    RefreshImageAction(this,1,1);
    $('.goodsDataOpinionCaptchaImg').attr('src',$('.goodsDataOpinionCaptchaImg').attr('src')+'&rand'+Math.random(0,10000));
    return false;
  });
  
  // Фильтры по товарам. При нажании на какую либо характеристику или свойство товара происходит фильтрация товаров
  $('.contentTbodySearchFilterBlock input').click(function(){
    $(this)[0].form.submit();
  });

  // Действия при выборе варианта доставки на этапе оформления заказа
  $('.deliveryRadio').click(function(){
    
    // Если текущая выделенная зона доставки не относится к выбранному варианту доставки, снимаем выделение с зоны доставки
    if($('.deliveryZoneRadio:checked').attr('deliveryid') != $(this).val()) {
      $('.deliveryZoneRadio:checked').click().attr('checked', false);
    }
  });
  
  // Действия при выборе зоны внутри варианта доставки на этапе оформления заказа
  $('.deliveryZoneRadio').click(function(){
    
    var 
      deliveryId = $(this).attr('deliveryid')
      ,deliveryZonePrice = $(this).parent().find('.deliveryZonePrice')
      ,deliveryTbody = $('.orderStageDeliveryListTable tbody[rel="' + deliveryId + '"]')
      ,deliveryBlock = deliveryTbody.find('#deliveryId' + deliveryId)
      ,deliveryZonePriceBlock = deliveryTbody.find('.orderStageDeliveryZonePrice')
      ,deliveryDefaultPriceBlock = deliveryTbody.find('.orderStageDeliveryDefaultPrice')
    ;

    // Если этот пункт уже выбран, при повторном клике пользователь видимо хочет снять выделение зоны доставки
    if('true' == $(this).attr('rel')) {
      $(this).attr('checked', false);
      $(this).attr('rel', 'false');
      
      // Показываем цену по умолчанию
      deliveryDefaultPriceBlock.show();
      // Скрываем цену образованную от зоны
      deliveryZonePriceBlock.hide();
      
    // Отмечаем у всех радио баттонов зон доставки свойство говорящее что они не отмечены
    } else {
      $('.deliveryZoneRadio').attr('rel', 'false');
      $(this).attr('rel', 'true');
      
      // Показываем цену по умолчанию
      deliveryDefaultPriceBlock.hide();
      // Скрываем цену образованную от зоны
      deliveryZonePriceBlock.show().html(deliveryZonePrice.html());
      
      // Выделяем вариант доставки к которому относится зона доставки
      deliveryBlock.attr('checked', true);
    }
    
  });

  $("#deliveryConvenientDate").datepicker({
		dayNames		    : ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
		dayNamesMin		  : ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб' ],
		closeText		    : 'Готово',
		currentText		  : 'Сегодня' ,
		duration		    : '',
		monthNames		  : ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
		monthNamesShort : ['Янв','Фев','Март','Апр','Май','Июнь','Июль','Авг','Сен','Окт','Ноя','Дек'],
		yearRange		    : "-6:+6",
		dateFormat		  : 'dd.mm.yy',
		minDate         : new Date(),
		firstDay		    : 1
	});
});


/* Отличия от других шаблонов */

// Прелоадер картинок, чтобы при наведении юзер не ждал пока подгрузятся эти картинки
function preloadImages(imgs){
  var picArr = [];
	for (i = 0; i<imgs.length; i++){
		picArr[i]= new Image(100,100); 
		picArr[i].src=imgs[i]; 
	}
}


$(document).ready(function(){

  // Действие при наведении на товар на главной
  $(".header .links li a").hover(
    function () {
      deff_class = $.trim($(this).attr('class'));
      $(this).attr('class', deff_class.replace(new RegExp("-act"), '') + '-act').addClass('hover');
    },
    function () {
      $(this).attr('class',deff_class).removeClass('hover');
    }
  );
  
  // Действие при наведении на меню категорий, для возможности отображения вложенного подменю
  $('ul.nav li').hover(
    function () {
      $(this).addClass('over');
    },
    function () {
      $(this).removeClass('over');
    }
  );
  
  // Действие при наведении на логотипы платёжных систем
  $(".footer .payment-sistems img").hover(
    function () {
      path = $(this).attr('src');
      $(this).attr('src', path.replace(new RegExp(".png"), '_act.png'));
    },
    function () {
      $(this).attr('src', path);
    }
  );
  
  // Навигация стрелочками по страницам со списками
  document.onkeyup = NavigateThrough;  
  function NavigateThrough (event)
  {
    if (!document.getElementById) return;
    if (window.event) event = window.event;
    if (event.ctrlKey) {
      var link = null;
      switch (event.keyCode ? event.keyCode : event.which ? event.which : null) {
        case 0x25:
          link = $('.previous_page')[0];
          break;
        case 0x27:
          link = $('.next_page')[0];
          break;
      }
      if (link && link.href) document.location = link.href;
    }             
  }
});

// Быстрый заказ
function quickorder(formSelector) {

  // Находим форму, которую отправляем на сервер, для добавления товара в корзину
  var formBlock = $($(formSelector).get(0));

  // Проверка на существование формы отправки запроса на добавление товара в корзину
  if(1 > formBlock.length || formBlock.get(0).tagName != 'FORM') {
    alert('Не удалось найти форму добавления товара в корзину');
    return false;
  }
  
  // Получаем данные формы, которые будем отправлять на сервер
  var formData = formBlock.serializeArray();

  // Сообщаем серверу, что мы пришли через ajax запрос
  formData.push({name: 'ajax_q', value: 1});
  // Так же сообщим ему, что нужно сразу отобразить форму быстрого заказа 
  formData.push({name: 'fast_order', value: 1});

  // Аяксом добавляем товар в корзину и вызываем форму быстрого заказа товара
  $.ajax({
    type		: "POST",
		cache	  : false,
		url		  : formBlock.attr('action'),
		data		: formData,
		success: function(data) {
			$.fancybox({
  	    content : data,
        // При изменении размера окна изменяем размер окна оформления заказа
        onUpdate  : function(){
          var w = $(window).width()*0.8;
          
          if(w < 800) {
            // Автоматический ресайз внутреннего блока fancybox-а
            $('.fancybox-inner').css('width', 'auto');
            // Изменяем размер fancybox окна
            $('.fancybox-wrap').css({'width': w + 'px'});
          }  
          return false;
        }
			}); 
      
      setTimeout(function(){$.fancybox.update();}, 500);
		}
	});

  return false;
}

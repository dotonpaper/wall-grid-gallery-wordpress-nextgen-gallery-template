
/*
* Title                   : Wall/Grid Gallery (WordPress NextGEN Gallery Template)
* Version                 : 1.5
* File                    : jquery.dop.NextGENWallGridGallery.js
* File Version            : 1.5
* Created / Last Modified : 05 May 2013
* Author                  : Dot on Paper
* Copyright               : © 2012 Dot on Paper
* Website                 : http://www.dotonpaper.net
* Description             : Wall/Grid jQuery plugin.
*/

(function($){
    $.fn.DOPNextGENWallGridGallery = function(options){
        var Container = this,
        ID = '',
        Settings,
        Content,
        
        Width = 900,
        Height = 0,
        BgColor = 'ffffff',
        BgAlpha = 100,
        NoLines = 3,
        NoColumns = 4,
        ImagesOrder = 'normal',
        ResponsiveEnabled = 'true',

        ThumbnailsSpacing = 15,
        ThumbnailsPaddingTop = 0,
        ThumbnailsPaddingRight = 0,
        ThumbnailsPaddingBottom = 0,
        ThumbnailsPaddingLeft = 0,
        ThumbnailsNavigation = 'mouse',
        ThumbnailsScrollScrubColor = '777777',
        ThumbnailsScrollBarColor = 'e0e0e0',
        ThumbnailsInfo = 'none',

        ThumbnailLoader = 'assets/gui/images/ThumbnailLoader.gif',
        ThumbnailWidth = 200,
        ThumbnailHeight = 100,
        ThumbnailWidthDesktop = 200,
        ThumbnailHeightDesktop = 100,
        ThumbnailWidthMobile = 100,
        ThumbnailHeightMobile = 50,
        ThumbnailAlpha = 80,
        ThumbnailAlphaHover = 100,
        ThumbnailBgColor = 'cccccc',
        ThumbnailBgColorHover = '000000',
        ThumbnailBorderSize = 0,
        ThumbnailBorderColor = 'cccccc',
        ThumbnailBorderColorHover = '000000',
        ThumbnailPaddingTop = 3,
        ThumbnailPaddingRight = 3,
        ThumbnailPaddingBottom = 3,
        ThumbnailPaddingLeft = 3,   
                                    
        LightboxPosition = 'document',
        LightboxWindowColor = '000000',
        LightboxWindowAlpha = 80,
        LightboxLoader = 'assets/gui/images/LightboxLoader.gif',
        LightboxBgColor = '000000',
        LightboxBgAlpha = 100,
        LightboxMarginTop = 70,
        LightboxMarginRight = 70,
        LightboxMarginBottom = 70,
        LightboxMarginLeft = 70,
        LightboxPaddingTop = 10,
        LightboxPaddingRight = 10,
        LightboxPaddingBottom = 10,
        LightboxPaddingLeft = 10,

        LightboxNavigationPrev = 'assets/gui/images/LightboxPrev.png',
        LightboxNavigationPrevHover = 'assets/gui/images/LightboxPrevHover.png',
        LightboxNavigationNext = 'assets/gui/images/LightboxNext.png',
        LightboxNavigationNextHover = 'assets/gui/images/LightboxNextHover.png',
        LightboxNavigationClose = 'assets/gui/images/LightboxClose.png',
        LightboxNavigationCloseHover = 'assets/gui/images/LightboxCloseHover.png',                                    
        
        CaptionHeight = 75,
        CaptionTitleColor = 'eeeeee',
        CaptionTextColor = 'dddddd',
        CaptionScrollScrubColor = '777777',
        CaptionScrollBgColor = 'e0e0e0',      
        
        SocialShareEnabled = 'true',
        SocialShareLightbox = 'assets/gui/images/SocialShareLightbox.png', 

        TooltipBgColor = 'ffffff',
        TooltipStrokeColor = '000000',
        TooltipTextColor = '000000',                                  
        
        LabelPosition = 'bottom',
        LabelTextColor = '000000',
        LabelTextColorHover = 'ffffff',
        
        Images = new Array(),
        Thumbs = new Array(),
        ThumbsWidth = new Array(),
        ThumbsHeight = new Array(),
        ThumbsLoaded = new Array(),
        ThumbsFirstPosX = new Array(),
        ThumbsFirstPosY = new Array(),
        CaptionTitle = new Array(),
        CaptionText = new Array(),
        Media = new Array(),
        Links = new Array(),
        LinksTarget = new Array(),
        noItems = 0,
        
        startGalleryID = 0,
        startWith = 0,
        
        initialWidth = Width,
        
        currentItem = 0,
        itemLoaded = false,
        ImageWidth = 0,
        ImageHeight = 0,
        LightboxDisplayTime = 600,
        LightboxNavigationDisplayTime = 600,
        
        socialShareInterval,
        
        methods = {
                    init:function( ){// Init Plugin.
                        return this.each(function(){                            
                            if (options){
                                $.extend(Data, options);
                            }
                               
                            if (!$(Container).hasClass('dopwgg-initialized')){
                                $(Container).addClass('dopwgg-initialized');
                                
                                methods.parseSettings();
                                $(window).bind('resize.DOPNextGENWallGridGallery', methods.initRP);
                                $(window).bind('scroll.DOPNextGENWallGridGallery', methods.initRPScroll);
                            }
                        });
                    },
                    parseSettings:function(){// Parse Settings.
                        ID = $(Container).attr('id').split('DOPNextGENWallGridGallery')[1];
                        Settings = eval('DOPNextGENWallGridGallerySettings'+ID);
                            
                        Width = parseInt(Settings['Width']);
                        Height = parseInt(Settings['Height']);
                        BgColor = Settings['BgColor'];
                        BgAlpha = parseInt(Settings['BgAlpha']);
                        NoLines = parseInt(Settings['NoLines']);
                        NoColumns = parseInt(Settings['NoColumns']);
                        ImagesOrder = Settings['ImagesOrder'];
                        ResponsiveEnabled = Settings['ResponsiveEnabled'];
                        ThumbnailsSpacing = parseInt(Settings['ThumbnailsSpacing']);
                        ThumbnailsPaddingTop = parseInt(Settings['ThumbnailsPaddingTop']);
                        ThumbnailsPaddingRight = parseInt(Settings['ThumbnailsPaddingRight']);
                        ThumbnailsPaddingBottom = parseInt(Settings['ThumbnailsPaddingBottom']);
                        ThumbnailsPaddingLeft = parseInt(Settings['ThumbnailsPaddingLeft']);
                        ThumbnailsNavigation = Settings['ThumbnailsNavigation'];
                        ThumbnailsScrollScrubColor = Settings['ThumbnailsScrollScrubColor'];
                        ThumbnailsScrollBarColor = Settings['ThumbnailsScrollBarColor'];
                        ThumbnailsInfo = Settings['ThumbnailsInfo'];
                        ThumbnailLoader = Settings['ThumbnailLoader'];
                        ThumbnailWidth = parseInt(Settings['ThumbnailWidth']);
                        ThumbnailHeight = parseInt(Settings['ThumbnailHeight']);
                        ThumbnailWidthDesktop = parseInt(Settings['ThumbnailWidth']);
                        ThumbnailHeightDesktop = parseInt(Settings['ThumbnailHeight']);
                        ThumbnailWidthMobile = parseInt(Settings['ThumbnailWidthMobile']);
                        ThumbnailHeightMobile = parseInt(Settings['ThumbnailHeightMobile']);
                        ThumbnailAlpha = parseInt(Settings['ThumbnailAlpha']);
                        ThumbnailAlphaHover = parseInt(Settings['ThumbnailAlphaHover']);
                        ThumbnailBgColor = Settings['ThumbnailBgColor'];
                        ThumbnailBgColorHover = Settings['ThumbnailBgColorHover'];
                        ThumbnailBorderSize = parseInt(Settings['ThumbnailBorderSize']);
                        ThumbnailBorderColor = Settings['ThumbnailBorderColor'];
                        ThumbnailBorderColorHover = Settings['ThumbnailBorderColorHover'];
                        ThumbnailPaddingTop = parseInt(Settings['ThumbnailPaddingTop']);
                        ThumbnailPaddingRight = parseInt(Settings['ThumbnailPaddingRight']);
                        ThumbnailPaddingBottom = parseInt(Settings['ThumbnailPaddingBottom']);
                        ThumbnailPaddingLeft = parseInt(Settings['ThumbnailPaddingLeft']);
                        LightboxPosition = Settings['LightboxPosition'];
                        LightboxWindowColor = Settings['LightboxWindowColor'];
                        LightboxWindowAlpha = parseInt(Settings['LightboxWindowAlpha']);
                        LightboxLoader = Settings['LightboxLoader'];
                        LightboxBgColor = Settings['LightboxBgColor'];
                        LightboxBgAlpha = parseInt(Settings['LightboxBgAlpha']);
                        LightboxMarginTop = parseInt(Settings['LightboxMarginTop']);
                        LightboxMarginRight = parseInt(Settings['LightboxMarginRight']);
                        LightboxMarginBottom = parseInt(Settings['LightboxMarginBottom']);
                        LightboxMarginLeft = parseInt(Settings['LightboxMarginLeft']);
                        LightboxPaddingTop = parseInt(Settings['LightboxPaddingTop']);
                        LightboxPaddingRight = parseInt(Settings['LightboxPaddingRight']);
                        LightboxPaddingBottom = parseInt(Settings['LightboxPaddingBottom']);
                        LightboxPaddingLeft = parseInt(Settings['LightboxPaddingLeft']);
                        LightboxNavigationPrev = Settings['LightboxNavigationPrev'];
                        LightboxNavigationPrevHover = Settings['LightboxNavigationPrevHover'];
                        LightboxNavigationNext = Settings['LightboxNavigationNext'];
                        LightboxNavigationNextHover = Settings['LightboxNavigationNextHover'];
                        LightboxNavigationClose = Settings['LightboxNavigationClose'];
                        LightboxNavigationCloseHover = Settings['LightboxNavigationCloseHover'];
                        CaptionHeight = parseInt(Settings['CaptionHeight']);
                        CaptionTitleColor = Settings['CaptionTitleColor'];
                        CaptionTextColor = Settings['CaptionTextColor'];
                        CaptionScrollScrubColor = Settings['CaptionScrollScrubColor'];
                        CaptionScrollBgColor = Settings['CaptionScrollBgColor'];
                        SocialShareEnabled = Settings['SocialShareEnabled'];
                        SocialShareLightbox = Settings['SocialShareLightbox'];
                        TooltipBgColor = Settings['TooltipBgColor'],
                        TooltipStrokeColor = Settings['TooltipStrokeColor'];
                        TooltipTextColor = Settings['TooltipTextColor'];          
                        LabelPosition = Settings['LabelPosition'];           
                        LabelTextColor = Settings['LabelTextColor'];    
                        LabelTextColorHover = Settings['LabelTextColorHover'];

                        methods.parseContent();
                    },
                    parseContent:function(){// Parse Content.
                        Content = eval('DOPNextGENWallGridGalleryContent'+ID);
                        console.log(Content);
                        $.each(Content, function(index){
                            $.each(Content[index], function(key){
                                switch (key){
                                    case 'Image':
                                        Images.push(prototypes.acaoBuster(Content[index][key])); break;
                                    case 'Thumb':
                                        Thumbs.push(prototypes.acaoBuster(Content[index][key])); break;
                                    case 'CaptionTitle':
                                        CaptionTitle.push(Content[index][key]);break;
                                    case 'CaptionText':
                                        CaptionText.push(Content[index][key]);break;
                                    case 'Media':
                                        Media.push(Content[index][key]);break;
                                    case 'Link':
                                        Links.push(Content[index][key]);break;
                                    case 'LinkTarget':
                                        if (Content[index][key] == ''){
                                            LinksTarget.push('_blank');
                                        }
                                        else{
                                            LinksTarget.push(Content[index][key]);
                                        }
                                        break;
                                }
                            });
                        });

                        noItems = Images.length;

                        if (ImagesOrder == 'random'){
                            methods.randomizeItems();
                        }

                        initialWidth = Width;

                        if (ResponsiveEnabled == 'true'){  
                            methods.rpResponsive();   
                        }

                        methods.initGallery();
                    },
                    randomizeItems:function(){
                        var indexes = new Array(), i,
                        auxImages = new Array(),
                        auxThumbs = new Array(),
                        auxCaptionTitle = new Array(),
                        auxCaptionText = new Array(),
                        auxMedia = new Array(),
                        auxLinks = new Array(),
                        auxLinksTarget = new Array();
                                                
                        for (i=0; i<noItems; i++){
                            indexes[i] = i;
                            auxImages[i] = Images[i];
                            auxThumbs[i] = Thumbs[i];
                            auxCaptionTitle[i] = CaptionTitle[i];
                            auxCaptionText[i] = CaptionText[i];
                            auxMedia[i] = Media[i];
                            auxLinks[i] = Links[i];
                            auxLinksTarget[i] = LinksTarget[i];
                        }
                        
                        indexes =  prototypes.randomize(indexes);
                        
                        for (i=0; i<noItems; i++){
                            Images[i] = auxImages[indexes[i]];
                            Thumbs[i] = auxThumbs[indexes[i]];
                            CaptionTitle[i] = auxCaptionTitle[indexes[i]];
                            CaptionText[i] = auxCaptionText[indexes[i]];
                            Media[i] = auxMedia[indexes[i]];
                            Links[i] = auxLinks[indexes[i]];
                            LinksTarget[i] = auxLinksTarget[indexes[i]];
                        }
                    },
                    initGallery:function(){// Init the Gallery
                        var LightboxHTML = new Array(),
                        HTML = new Array();

                        LightboxHTML.push('    <div class="DOP_NextGENWallGridGallery_LightboxWrapper" id="DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+'">');
                        LightboxHTML.push('        <div class="DOP_NextGENWallGridGallery_LightboxWindow"></div>');
                        LightboxHTML.push('        <div class="DOP_NextGENWallGridGallery_LightboxLoader"><img src="'+LightboxLoader+'" alt="" /></div>');
                        LightboxHTML.push('        <div class="DOP_NextGENWallGridGallery_LightboxContainer">');
                        LightboxHTML.push('            <div class="DOP_NextGENWallGridGallery_LightboxBg"></div>');
                        LightboxHTML.push('            <div class="DOP_NextGENWallGridGallery_Lightbox"></div>');
                        LightboxHTML.push('            <div class="DOP_NextGENWallGridGallery_LightboxNavigation">');
                        LightboxHTML.push('                <div class="DOP_NextGENWallGridGallery_LightboxNavigationExtraButtons">');         
                        LightboxHTML.push('                    <div class="DOP_NextGENWallGridGallery_LightboxNavigation_CloseBtn">');
                        LightboxHTML.push('                        <img src="'+LightboxNavigationClose+'" class="normal" alt="" />');
                        LightboxHTML.push('                        <img src="'+LightboxNavigationCloseHover+'" class="hover" alt="" />');   
                        LightboxHTML.push('                    </div>'); 
                        if (SocialShareEnabled == 'true'){
                            LightboxHTML.push('                    <div class="DOP_NextGENWallGridGallery_LightboxSocialShare"></div>');
                        } 
                        LightboxHTML.push('                    <br class="DOP_NextGENWallGridGallery_Clear" />'); 
                        LightboxHTML.push('                </div>');      
                        LightboxHTML.push('                <div class="DOP_NextGENWallGridGallery_LightboxNavigationButtons">');
                        LightboxHTML.push('                    <div class="DOP_NextGENWallGridGallery_LightboxNavigation_PrevBtn">');
                        LightboxHTML.push('                        <img src="'+LightboxNavigationPrev+'" class="normal" alt="" />');
                        LightboxHTML.push('                        <img src="'+LightboxNavigationPrevHover+'" class="hover" alt="" />');   
                        LightboxHTML.push('                    </div>');   
                        LightboxHTML.push('                    <div class="DOP_NextGENWallGridGallery_LightboxNavigation_NextBtn">');
                        LightboxHTML.push('                        <img src="'+LightboxNavigationNext+'" class="normal" alt="" />');
                        LightboxHTML.push('                        <img src="'+LightboxNavigationNextHover+'" class="hover" alt="" />');   
                        LightboxHTML.push('                    </div>'); 
                        LightboxHTML.push('                    <br class="DOP_NextGENWallGridGallery_Clear" />'); 
                        LightboxHTML.push('                </div>');             
                        LightboxHTML.push('            </div>');
                        LightboxHTML.push('            <div class="DOP_NextGENWallGridGallery_Caption">');
                        LightboxHTML.push('                <div class="DOP_NextGENWallGridGallery_CaptionTextWrapper">');
                        LightboxHTML.push('                    <div class="DOP_NextGENWallGridGallery_CaptionTitle">');
                        LightboxHTML.push('                        <div class="title"></div>');
                        LightboxHTML.push('                        <div class="count"><span id="DOP_NextGENWallGridGallery_ItemCount_'+ID+'"></span> / '+noItems+'</div>');
                        LightboxHTML.push('                        <br style="clear:both;" />');
                        LightboxHTML.push('                    </div>');
                        LightboxHTML.push('                    <div class="DOP_NextGENWallGridGallery_CaptionTextContainer">');
                        LightboxHTML.push('                        <div class="DOP_NextGENWallGridGallery_CaptionText"></div>');
                        LightboxHTML.push('                    </div>');
                        LightboxHTML.push('                </div>');
                        LightboxHTML.push('            </div>');         
                        LightboxHTML.push('        </div>');
                        LightboxHTML.push('    </div>');

                        HTML.push('<div class="DOP_NextGENWallGridGallery_Container">');
                        HTML.push('   <div class="DOP_NextGENWallGridGallery_Background"></div>');
                        HTML.push('   <div class="DOP_NextGENWallGridGallery_ThumbnailsWrapper">');
                        HTML.push('       <div class="DOP_NextGENWallGridGallery_Thumbnails"></div>');
                        HTML.push('   </div>');
                        
                        if (ThumbnailsInfo == 'tooltip' && !prototypes.isTouchDevice()){
                            HTML.push('<div class="DOP_NextGENWallGridGallery_Tooltip"></div>');
                        }                        
                        
                        if (LightboxPosition != 'document'){
                            HTML.push(LightboxHTML.join(''));
                        }
                        HTML.push('</div>');

                        Container.html(HTML.join(''));
                        
                        if (LightboxPosition == 'document'){
                            $('body').append(LightboxHTML.join(''));
                        }
                        methods.initSettings();
                    },
                    initSettings:function(){// Init Settings
                        methods.initContainer();
                        methods.initBackground();
                        methods.initThumbnails();
                        
                        if (ThumbnailsInfo == 'tooltip' && !prototypes.isTouchDevice()){
                            methods.initTooltip();
                        }
                        methods.initLightbox();
                        methods.initCaption();
                        
                        if (SocialShareEnabled == 'true'){
                            methods.initSocialShare();
                        }
                    },
                    initRP:function(){// Init Resize & Positioning
                        if (ResponsiveEnabled == 'true'){   
                            methods.rpResponsive();    
                            methods.rpContainer();
                            methods.rpBackground();
                            methods.rpThumbnails();

                            if (itemLoaded){
                                if (Media[currentItem-1] == ''){
                                    methods.rpLightboxImage();
                                }
                                else{
                                    methods.rpLightboxMedia();
                                }
                            }
                        }
                    },
                    initRPScroll:function(){// Init Resize & Positioning
                        if (ResponsiveEnabled == 'true'){   
                            methods.rpResponsive();    
                            methods.rpContainer();
                            methods.rpBackground();

                            if (itemLoaded){
                                if (Media[currentItem-1] == ''){
                                    methods.rpLightboxImage();
                                }
                                else{
                                    methods.rpLightboxMedia();
                                }
                            }
                        }
                    },
                    rpResponsive:function(){
                        var hiddenBustedItems = prototypes.doHideBuster($(Container));
                        
                        if ($(Container).width() < initialWidth){
                            Width = $(Container).width();                                
                        }
                        else{
                            Width = initialWidth;
                        }
                        
                        if ($(window).width() <= 640){
                            ThumbnailWidth = ThumbnailWidthMobile;
                            ThumbnailHeight = ThumbnailHeightMobile;
                        }
                        else{
                            ThumbnailWidth = ThumbnailWidthDesktop;
                            ThumbnailHeight = ThumbnailHeightDesktop;
                        }
                        
                        prototypes.undoHideBuster(hiddenBustedItems);
                    },

                    initContainer:function(){// Init Container
                        $('.DOP_NextGENWallGridGallery_Container', Container).css('display', 'block');
                        
                        if (Height == 0){
                            $('.DOP_NextGENWallGridGallery_Container', Container).css('overflow', 'visible');
                        }
                        methods.rpContainer();
                    },
                    rpContainer:function(){// Resize & Position Container
                        $('.DOP_NextGENWallGridGallery_Container', Container).width(Width);

                        if (Height != 0){
                            $('.DOP_NextGENWallGridGallery_Container', Container).height(Height);
                        }
                        else{
                            $('.DOP_NextGENWallGridGallery_Container', Container).css('height', 'auto');
                            $('.DOP_NextGENWallGridGallery_ThumbnailsWrapper', Container).css('height', 'auto');                            
                        }
                    },

                    initBackground:function(){// Init Background
                        $('.DOP_NextGENWallGridGallery_Background', Container).css('background-color', '#'+BgColor);
                        $('.DOP_NextGENWallGridGallery_Background', Container).css('opacity', parseInt(BgAlpha)/100);

                        methods.rpBackground();
                    },
                    rpBackground:function(){// Resize & Position Background
                        $('.DOP_NextGENWallGridGallery_Background', Container).width(Width);
                        
                        if (Height != 0){
                            $('.DOP_NextGENWallGridGallery_Background', Container).height(Height);
                        }
                        else{                            
                            $('.DOP_NextGENWallGridGallery_Background', Container).height($('.DOP_NextGENWallGridGallery_ThumbnailsWrapper', Container).height());
                        }
                    },

                    initThumbnails:function(){//Init Thumbnails
                        if (Height == 0){
                            $('.DOP_NextGENWallGridGallery_ThumbnailsWrapper', Container).css({'overflow': 'visible',
                                                                                        'position': 'relative'});
                        }
                        
                        for (var i=1; i<=noItems; i++){
                            methods.loadThumb(i);
                        }
                        
                        if (Height != 0){
                            if (prototypes.isTouchDevice()){
                                prototypes.touchNavigation($('.DOP_NextGENWallGridGallery_ThumbnailsWrapper', Container), $('.DOP_NextGENWallGridGallery_Thumbnails', Container));
                            }
                            else if (ThumbnailsNavigation == 'mouse'){
                                $('.DOP_NextGENWallGridGallery_Thumbnails', Container).css('position', 'absolute');
                                methods.moveThumbnails();
                            }
                            else if (ThumbnailsNavigation == 'scroll'){
                                methods.initThumbnailsScroll();
                            }
                        }
                        
                        methods.rpThumbnails();
                    },
                    loadThumb:function(no){// Load a thumbnail
                        methods.initThumb(no);
                        var img = new Image();

                        $(img).load(function(){
                            $('.DOP_NextGENWallGridGallery_Thumb', '#DOP_NextGENWallGridGallery_ThumbContainer_'+ID+'_'+no, Container).html(this);
                            $('.DOP_NextGENWallGridGallery_Thumb img', '#DOP_NextGENWallGridGallery_ThumbContainer_'+ID+'_'+no, Container).attr('alt', CaptionTitle[no-1]);
                            
                            var hiddenBustedItems = prototypes.doHideBuster($(Container));
                            ThumbsWidth[no-1] = $(this).width();
                            ThumbsHeight[no-1] = $(this).height();
                            prototypes.undoHideBuster(hiddenBustedItems);
                            
                            methods.loadCompleteThumb(no);
                        }).attr('src', Thumbs[no-1]);
                    },
                    initThumb:function(no){// Init thumbnail before loading
                        var ThumbHTML = new Array(), 
                        labelHeight = ThumbnailsInfo == 'label' ? $('.DOP_NextGENWallGridGallery_ThumbLabel', Container).height()+parseFloat($('.DOP_NextGENWallGridGallery_ThumbLabel', Container).css('padding-top'))+parseFloat($('.DOP_NextGENWallGridGallery_ThumbLabel', Container).css('padding-bottom')):0;
                        
                        ThumbHTML.push('<div class="DOP_NextGENWallGridGallery_ThumbContainer" id="DOP_NextGENWallGridGallery_ThumbContainer_'+ID+'_'+no+'">');
                        
                        if (LabelPosition == 'top' && ThumbnailsInfo == 'label'){
                            if (CaptionTitle[no-1] != ''){
                                ThumbHTML.push('   <div class="DOP_NextGENWallGridGallery_ThumbLabel">'+CaptionTitle[no-1]+'</div>');
                            }
                            else{
                                ThumbHTML.push('   <div class="DOP_NextGENWallGridGallery_ThumbLabel">&nbsp;</div>');
                            }                                                 
                        }
                        
                        ThumbHTML.push('   <div class="DOP_NextGENWallGridGallery_Thumb"></div>');   
                        
                        if (LabelPosition == 'bottom' && ThumbnailsInfo == 'label'){
                            if (CaptionTitle[no-1] != ''){
                                ThumbHTML.push('   <div class="DOP_NextGENWallGridGallery_ThumbLabel">'+CaptionTitle[no-1]+'</div>');
                            }
                            else{
                                ThumbHTML.push('   <div class="DOP_NextGENWallGridGallery_ThumbLabel">&nbsp;</div>');
                            }                    
                        }

                        if (no == noItems){
                            ThumbHTML.push('</div><br style="clear:both;" />');
                        }
                        else{
                            ThumbHTML.push('</div>');
                        }

                        $('.DOP_NextGENWallGridGallery_Thumbnails', Container).append(ThumbHTML.join(""));

                        if (!prototypes.isTouchDevice()){
                            $('#DOP_NextGENWallGridGallery_ThumbContainer_'+ID+'_'+no).css('opacity', parseInt(ThumbnailAlpha)/100);
                        }
                        
                        ThumbsLoaded[no-1] = false;
                        
                        if (LabelPosition == 'top' && ThumbnailsInfo == 'label'){                            
                            $('.DOP_NextGENWallGridGallery_Thumb', Container).css('margin-top', ThumbnailPaddingTop+labelHeight);                  
                        }
                        else{
                            $('.DOP_NextGENWallGridGallery_Thumb', '#DOP_NextGENWallGridGallery_ThumbContainer_'+ID+'_'+no).css('margin-top', ThumbnailPaddingTop);
                        }
                        $('.DOP_NextGENWallGridGallery_Thumb', '#DOP_NextGENWallGridGallery_ThumbContainer_'+ID+'_'+no).css('margin-left', ThumbnailPaddingLeft);
                        $('.DOP_NextGENWallGridGallery_Thumb', '#DOP_NextGENWallGridGallery_ThumbContainer_'+ID+'_'+no).css('margin-bottom', ThumbnailPaddingBottom);
                        $('.DOP_NextGENWallGridGallery_Thumb', '#DOP_NextGENWallGridGallery_ThumbContainer_'+ID+'_'+no).css('margin-right', ThumbnailPaddingRight);

                        $('#DOP_NextGENWallGridGallery_ThumbContainer_'+ID+'_'+no).css('background-color', '#'+ThumbnailBgColor);
                        $('#DOP_NextGENWallGridGallery_ThumbContainer_'+ID+'_'+no).css('border-width', ThumbnailBorderSize);
                        $('#DOP_NextGENWallGridGallery_ThumbContainer_'+ID+'_'+no).css('border-color', '#'+ThumbnailBorderColor);

                        $('#DOP_NextGENWallGridGallery_ThumbContainer_'+ID+'_'+no).addClass('DOP_NextGENWallGridGallery_ThumbLoader');
                        $('#DOP_NextGENWallGridGallery_ThumbContainer_'+ID+'_'+no+'.DOP_NextGENWallGridGallery_ThumbLoader').css('background-image', 'url('+ThumbnailLoader+')');
                        
                        if (ThumbnailsInfo == 'label'){
                            $('.DOP_NextGENWallGridGallery_ThumbLabel', Container).css('color', '#'+LabelTextColor);
                        }
                        
                        methods.rpThumbnails();
                    },
                    loadCompleteThumb:function(no){// Resize, Position & Edit a thumbnmail after loading
                        $('#DOP_NextGENWallGridGallery_ThumbContainer_'+ID+'_'+no+'.DOP_NextGENWallGridGallery_ThumbLoader').css('background-image', 'none');
                        $('#DOP_NextGENWallGridGallery_ThumbContainer_'+ID+'_'+no).removeClass('DOP_NextGENWallGridGallery_ThumbLoader');
                        ThumbsLoaded[no-1] = true;
                        
                        methods.rpThumbnails();
                        
                        $('.DOP_NextGENWallGridGallery_Thumb', '#DOP_NextGENWallGridGallery_ThumbContainer_'+ID+'_'+no).css('opacity', 0);
                        $('.DOP_NextGENWallGridGallery_Thumb', '#DOP_NextGENWallGridGallery_ThumbContainer_'+ID+'_'+no).stop(true, true).animate({'opacity':'1'}, 600);
                        
                        if (!prototypes.isTouchDevice()){
                            $('#DOP_NextGENWallGridGallery_ThumbContainer_'+ID+'_'+no).hover(function(){
                                $(this).stop(true, true).animate({'opacity': ThumbnailAlphaHover/100}, 600);
                                $(this).css('background-color', '#'+ThumbnailBgColorHover);
                                $(this).css('border-color', '#'+ThumbnailBorderColorHover);
                                
                                if (ThumbnailsInfo == 'tooltip' && !prototypes.isTouchDevice()){
                                    methods.showTooltip(no-1);
                                }
                                
                                if (ThumbnailsInfo == 'label'){
                                    $('.DOP_NextGENWallGridGallery_ThumbLabel', this).css('color', '#'+LabelTextColorHover);
                                }
                            },
                            function(){
                                $(this).stop(true, true).animate({'opacity':parseInt(ThumbnailAlpha)/100}, 600);
                                $(this).css('background-color', '#'+ThumbnailBgColor);
                                $(this).css('border-color', '#'+ThumbnailBorderColor);
                                
                                if (ThumbnailsInfo == 'tooltip' && !prototypes.isTouchDevice()){
                                    $('.DOP_NextGENWallGridGallery_Tooltip', Container).css('display', 'none');
                                }
                                
                                if (ThumbnailsInfo == 'label'){
                                    $('.DOP_NextGENWallGridGallery_ThumbLabel', this).css('color', '#'+LabelTextColor);
                                }
                            });
                        }

                        $('#DOP_NextGENWallGridGallery_ThumbContainer_'+ID+'_'+no, Container).click(function(){
                            if (Links[no-1] != ''){
                                prototypes.openLink(Links[no-1], LinksTarget[no-1]);
                            }
                            else{
                                methods.showLightbox(no);                                
                            }
                        });
                    },
                    rpThumbnails:function(){// Resize & Position Thumbnails
                        var labelHeight = ThumbnailsInfo == 'label' ? $('.DOP_NextGENWallGridGallery_ThumbLabel', Container).height()+parseFloat($('.DOP_NextGENWallGridGallery_ThumbLabel', Container).css('padding-top'))+parseFloat($('.DOP_NextGENWallGridGallery_ThumbLabel', Container).css('padding-bottom')):0,
                        thumbnailWidth = ThumbnailWidth+ThumbnailPaddingRight+ThumbnailPaddingLeft+2*ThumbnailBorderSize,
                        no = 0,
                        hiddenBustedItems = prototypes.doHideBuster($(Container));

                        if (Height == 0){
                            NoColumns = parseInt((Width-ThumbnailsPaddingRight-ThumbnailsPaddingLeft+ThumbnailsSpacing)/(thumbnailWidth+ThumbnailsSpacing));
                            NoLines = parseInt(noItems/NoColumns);
                        
                            if (NoColumns == 0){
                                NoColumns = 1;
                            }

                            if (NoLines*NoColumns < noItems){
                                NoLines++;
                            }
                        }
                        else{
                            if (NoLines*NoColumns < noItems){
                                if (noItems%NoColumns != 0){
                                    NoLines = parseInt(noItems/NoColumns)+1;
                                }
                                else{
                                    NoLines = noItems/NoColumns;
                                }
                            }
                        }

                        $('.DOP_NextGENWallGridGallery_ThumbContainer', Container).css({'height': ThumbnailHeight+ThumbnailPaddingTop+ThumbnailPaddingBottom+labelHeight,
                                                                                 'margin-top': 0,
                                                                                 'margin-right': 0,
                                                                                 'margin-bottom': 0,
                                                                                 'margin-left': 0,
                                                                                 'width': ThumbnailWidth+ThumbnailPaddingRight+ThumbnailPaddingLeft});
                        $('.DOP_NextGENWallGridGallery_Thumb', Container).width(ThumbnailWidth);
                        $('.DOP_NextGENWallGridGallery_Thumb', Container).height(ThumbnailHeight);

                        $('.DOP_NextGENWallGridGallery_ThumbContainer', Container).each(function(){
                            no++;

                            if (no > NoColumns){
                                $(this).css('margin-top', ThumbnailsSpacing);
                            }

                            if (no%NoColumns != 1 && NoColumns != 1){
                                $(this).css('margin-left', ThumbnailsSpacing);
                            }

                            if (no <= NoColumns){
                                $(this).css('margin-top', ThumbnailsPaddingTop);
                            }

                            if (no%NoColumns == 0 && NoColumns != 1){
                                $(this).css('margin-right', ThumbnailsPaddingRight);
                            }

                            if (no > NoColumns*(NoLines-1)){
                                $(this).css('margin-bottom', ThumbnailsPaddingBottom);
                            }

                            if (no%NoColumns == 1 && NoColumns != 1){
                                $(this).css('margin-left', ThumbnailsPaddingLeft);
                            }          

                            if (ThumbsLoaded[no-1]){
                                if ($('img', this).width() == 0){
                                    prototypes.resizeItem2($('.DOP_NextGENWallGridGallery_Thumb', this), $('img', this), ThumbnailWidth, ThumbnailHeight, $('.DOP_NextGENWallGridGallery_Thumb', this).width(), $('.DOP_NextGENWallGridGallery_Thumb', this).height(), 'center');
                                }
                                else{
                                    prototypes.resizeItem2($('.DOP_NextGENWallGridGallery_Thumb', this), $('img', this), ThumbnailWidth, ThumbnailHeight, ThumbsWidth[no-1], ThumbsHeight[no-1], 'center');
                                }
                                
                                if (ThumbsFirstPosX[no-1] == undefined){
                                    ThumbsFirstPosX[no-1] = parseInt($('img', this).css('margin-left'));
                                }
                                else{
                                    if (Math.abs(ThumbsFirstPosX[no-1]-parseInt($('img', this).css('margin-left'))) < 5){
                                        $('img', this).css('margin-left', ThumbsFirstPosX[no-1]);
                                    }
                                }
                                
                                if (ThumbsFirstPosY[no-1] == undefined){
                                    ThumbsFirstPosY[no-1] = parseInt($('img', this).css('margin-top'));
                                }
                                else{
                                    if (Math.abs(ThumbsFirstPosY[no-1]-parseInt($('img', this).css('margin-top'))) < 5){
                                        $('img', this).css('margin-top', ThumbsFirstPosY[no-1]);
                                    }
                                }
                            }
                        });
                        
                        $('.DOP_NextGENWallGridGallery_Thumbnails', Container).width(ThumbnailsPaddingRight+ThumbnailsPaddingLeft+thumbnailWidth*NoColumns+(NoColumns-1)*ThumbnailsSpacing);

                        if ($('.DOP_NextGENWallGridGallery_Thumbnails', Container).width() <= $('.DOP_NextGENWallGridGallery_Container', Container).width()){
                            $('.DOP_NextGENWallGridGallery_ThumbnailsWrapper', Container).width($('.DOP_NextGENWallGridGallery_Thumbnails', Container).width());
                        }
                        else{
                            $('.DOP_NextGENWallGridGallery_ThumbnailsWrapper', Container).width($('.DOP_NextGENWallGridGallery_Container', Container).width());
                        }

                        if ($('.DOP_NextGENWallGridGallery_Thumbnails', Container).height() <= $('.DOP_NextGENWallGridGallery_Container', Container).height()){
                            $('.DOP_NextGENWallGridGallery_ThumbnailsWrapper', Container).height($('.DOP_NextGENWallGridGallery_Thumbnails', Container).height());
                        }
                        else{
                            $('.DOP_NextGENWallGridGallery_ThumbnailsWrapper', Container).height($('.DOP_NextGENWallGridGallery_Container', Container).height());
                        }
                        
                        prototypes.centerItem($('.DOP_NextGENWallGridGallery_Container', Container), $('.DOP_NextGENWallGridGallery_ThumbnailsWrapper', Container), $('.DOP_NextGENWallGridGallery_Container', Container).width(), $('.DOP_NextGENWallGridGallery_Container', Container).height());
                                                
                        if (parseInt($('.DOP_NextGENWallGridGallery_Thumbnails', Container).css('margin-left')) < (-1)*($('.DOP_NextGENWallGridGallery_Thumbnails', Container).width()-$('.DOP_NextGENWallGridGallery_ThumbnailsWrapper', Container).width())){
                            $('.DOP_NextGENWallGridGallery_Thumbnails', Container).css('margin-left', (-1)*($('.DOP_NextGENWallGridGallery_Thumbnails', Container).width()-$('.DOP_NextGENWallGridGallery_ThumbnailsWrapper', Container).width()));
                        }
                        if (parseInt($('.DOP_NextGENWallGridGallery_Thumbnails', Container).css('margin-left')) > 0){
                            $('.DOP_NextGENWallGridGallery_Thumbnails', Container).css('margin-left', 0);
                        }
                        if (parseInt($('.DOP_NextGENWallGridGallery_Thumbnails', Container).css('margin-top')) < (-1)*($('.DOP_NextGENWallGridGallery_Thumbnails', Container).height()-$('.DOP_NextGENWallGridGallery_ThumbnailsWrapper', Container).height())){
                            $('.DOP_NextGENWallGridGallery_Thumbnails', Container).css('margin-top', (-1)*($('.DOP_NextGENWallGridGallery_Thumbnails', Container).height()-$('.DOP_NextGENWallGridGallery_ThumbnailsWrapper', Container).height()));
                        }
                        if (parseInt($('.DOP_NextGENWallGridGallery_Thumbnails', Container).css('margin-top')) > 0){
                            $('.DOP_NextGENWallGridGallery_Thumbnails', Container).css('margin-top', 0);
                        }
                        
                        $('.DOP_NextGENWallGridGallery_ThumbnailsWrapper .jspContainer', Container).width($('.DOP_NextGENWallGridGallery_ThumbnailsWrapper', Container).width());
                        $('.jspDrag', '.DOP_NextGENWallGridGallery_ThumbnailsWrapper', Container).css('background', '#'+ThumbnailsScrollScrubColor);
                        $('.jspTrack', '.DOP_NextGENWallGridGallery_ThumbnailsWrapper', Container).css('background', '#'+ThumbnailsScrollBarColor);
                        
                        methods.rpContainer();
                        methods.rpBackground();
                        
                        prototypes.undoHideBuster(hiddenBustedItems);
                    },
                    moveThumbnails:function(){// Init thumbnails move
                        $('.DOP_NextGENWallGridGallery_ThumbnailsWrapper', Container).mousemove(function(e){
                            var thumbnailWidth, thumbnailHeight, mousePosition, thumbnailsPosition;

                            if ($('.DOP_NextGENWallGridGallery_Thumbnails', Container).width() > $('.DOP_NextGENWallGridGallery_ThumbnailsWrapper', Container).width()){
                                thumbnailWidth = ThumbnailWidth+ThumbnailPaddingRight+ThumbnailPaddingLeft+2*ThumbnailBorderSize;
                                mousePosition = e.clientX-$(this).offset().left+parseInt($(this).css('margin-left'))+$(document).scrollLeft();
                                thumbnailsPosition = 0-(mousePosition-thumbnailWidth)*($('.DOP_NextGENWallGridGallery_Thumbnails', Container).width()-$('.DOP_NextGENWallGridGallery_ThumbnailsWrapper', Container).width())/($('.DOP_NextGENWallGridGallery_ThumbnailsWrapper', Container).width()-2*thumbnailWidth);
                                if (thumbnailsPosition < (-1)*($('.DOP_NextGENWallGridGallery_Thumbnails', Container).width()-$('.DOP_NextGENWallGridGallery_ThumbnailsWrapper', Container).width())){
                                    thumbnailsPosition = (-1)*($('.DOP_NextGENWallGridGallery_Thumbnails', Container).width()-$('.DOP_NextGENWallGridGallery_ThumbnailsWrapper', Container).width());
                                }
                                if (thumbnailsPosition > 0){
                                    thumbnailsPosition = 0;
                                }
                                $('.DOP_NextGENWallGridGallery_Thumbnails', Container).css('margin-left', thumbnailsPosition);
                            }

                            if ($('.DOP_NextGENWallGridGallery_Thumbnails', Container).height() > $('.DOP_NextGENWallGridGallery_ThumbnailsWrapper', Container).height()){
                                thumbnailHeight = ThumbnailHeight+ThumbnailPaddingTop+ThumbnailPaddingBottom+2*ThumbnailBorderSize;
                                mousePosition = e.clientY-$(this).offset().top+parseInt($(this).css('margin-top'))+$(document).scrollTop();
                                thumbnailsPosition = 0-(mousePosition-thumbnailHeight)*($('.DOP_NextGENWallGridGallery_Thumbnails', Container).height()-$('.DOP_NextGENWallGridGallery_ThumbnailsWrapper', Container).height())/($('.DOP_NextGENWallGridGallery_ThumbnailsWrapper', Container).height()-2*thumbnailHeight);
                                if (thumbnailsPosition < (-1)*($('.DOP_NextGENWallGridGallery_Thumbnails', Container).height()-$('.DOP_NextGENWallGridGallery_ThumbnailsWrapper', Container).height())){
                                    thumbnailsPosition = (-1)*($('.DOP_NextGENWallGridGallery_Thumbnails', Container).height()-$('.DOP_NextGENWallGridGallery_ThumbnailsWrapper', Container).height());
                                }
                                if (thumbnailsPosition > 0){
                                    thumbnailsPosition = 0;
                                }
                                $('.DOP_NextGENWallGridGallery_Thumbnails', Container).css('margin-top', thumbnailsPosition);
                            }
                        });
                    },
                    initThumbnailsScroll:function(){//Init Thumbnails Scroll
                        setTimeout(function(){                            
                            $('.DOP_NextGENWallGridGallery_ThumbnailsWrapper', Container).jScrollPane({autoReinitialise: true});
                            $('.jspDrag', '.DOP_NextGENWallGridGallery_ThumbnailsWrapper', Container).css('background', '#'+ThumbnailsScrollScrubColor);
                            $('.jspTrack', '.DOP_NextGENWallGridGallery_ThumbnailsWrapper', Container).css('background', '#'+ThumbnailsScrollBarColor);
                        }, 10);
                    },

                    initLightbox:function(){// Init Lightbox
                        startGalleryID = prototypes.$_GET('dop_wall_grid_gallery_id') != undefined ? parseInt(prototypes.$_GET('dop_wall_grid_gallery_id')):0;
                        startWith = prototypes.$_GET('dop_wall_grid_gallery_share') != undefined && startGalleryID == ID ? parseInt(prototypes.$_GET('dop_wall_grid_gallery_share')):0;
                        
                        $('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_LightboxWindow').css({'background-color': '#'+LightboxWindowColor,
                                                                                                                  'opacity': LightboxWindowAlpha/100});
                        $('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_LightboxBg').css({'background-color': '#'+LightboxBgColor,
                                                                                                              'opacity': LightboxBgAlpha/100});
                                                                                             
                        $('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_LightboxContainer').hover(function(){
                            $('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_LightboxNavigation').stop(true, true).animate({'opacity': 1}, LightboxNavigationDisplayTime);
                        }, function(){
                            $('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_LightboxNavigation').stop(true, true).animate({'opacity': 0}, LightboxNavigationDisplayTime);
                        });

                        if (!prototypes.isTouchDevice()){                        
                            $('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_LightboxNavigation_PrevBtn').hover(function(){
                                $('.normal', this).css('display', 'none');
                                $('.hover', this).css('display', 'block');
                            }, function(){
                                $('.normal', this).css('display', 'block');
                                $('.hover', this).css('display', 'none');                            
                            });
                        
                            $('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_LightboxNavigation_NextBtn').hover(function(){
                                $('.normal', this).css('display', 'none');
                                $('.hover', this).css('display', 'block');
                            }, function(){
                                $('.normal', this).css('display', 'block');
                                $('.hover', this).css('display', 'none');                            
                            });
                        
                            $('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_LightboxNavigation_CloseBtn').hover(function(){
                                $('.normal', this).css('display', 'none');
                                $('.hover', this).css('display', 'block');
                            }, function(){
                                $('.normal', this).css('display', 'block');
                                $('.hover', this).css('display', 'none');                            
                            });
                        }
                        else{
                            $('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_LightboxNavigation').css('opacity', 1);
                            methods.lightboxNavigationSwipe();
                        }
                        
                        $('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_LightboxNavigation_PrevBtn').click(function(){
                            methods.previousLightbox();
                        });
                        
                        $('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_LightboxNavigation_NextBtn').click(function(){
                            methods.nextLightbox();
                        });
                                                
                        $('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_LightboxSocialShare').hover(function(){
                            setTimeout(function(){                                
                                $('#at15s').css('position', 'fixed');
                                
                                $('#at15s').hover(function(){
                                    $('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_LightboxNavigation').stop(true, true).animate({'opacity': 1}, 0);  
                                }, function(){
                                });
                            }, 10);
                        }, function(){});
                        
                        $('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_LightboxNavigation_CloseBtn').click(function(){
                           methods.hideLightbox();                           
                        });
                        
                        $('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_LightboxWindow').click(function(){
                           methods.hideLightbox();                           
                        });
                        
                        $(document).keydown(function(e){
                            if (itemLoaded){
                                switch (e.keyCode){
                                    case 27:
                                        methods.hideLightbox();
                                        break;
                                    case 37:
                                        methods.previousLightbox();
                                        break;
                                    case 39:
                                        methods.nextLightbox();
                                        break;                                    
                                }
                            }
                        });
                        
                        if (startGalleryID == ID){
                            var href = window.location.href,
                            variables = 'dop_wall_grid_gallery_id='+startGalleryID+'&dop_wall_grid_gallery_share='+startWith;

                            if (href.indexOf('?'+variables) != -1){
                                variables = '?'+variables;
                            }
                            else{
                                variables = '&'+variables;
                            }
                                
                            window.location = '#DOPWallGridGallery'+ID;
                            
                            try{
                                window.history.pushState({'html':'', 'pageTitle':document.title}, '', href.split(variables)[0]);
                                $('.ngg-navigation a').attr('href', $('.ngg-navigation a').attr('href').split(variables)[0]+$('.ngg-navigation a').attr('href').split(variables)[1]);
                            }catch(e){
                                //console.log(e);
                            }
                        }
                        
                        if (startWith != 0){
                            methods.showLightbox(startWith);
                            startWith = 0;
                        }
                    },
                    showLightbox:function(no){// Show Lightbox
                        var documentW, documentH, windowW, windowH, maxWidth, maxHeight, currW, currH;
                        
                        if (LightboxPosition == 'document'){
                            documentW = $(document).width(); 
                            documentH = $(document).height();
                            windowW = $(window).width();
                            windowH = $(window).height();
                        }
                        else{                            
                            documentW = Width; 
                            documentH = Height;
                            windowW = Width;
                            windowH = Height;
                            $('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_LightboxContainer').css('position', 'absolute');
                            $('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_LightboxLoader').css('position', 'absolute');
                        }
                                                
                        $('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID).width(documentW);
                        $('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID).height(documentH);
                        $('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_LightboxWindow').width(documentW);
                        $('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_LightboxWindow').height(documentH);
                        
                        $('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID).css('display', 'block');
                        $('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_LightboxLoader').css('display', 'block');
                        $('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_LightboxLoader').css({'margin-top': (windowH-$('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_LightboxLoader').height())/2,
                                                                                                                  'margin-left': (windowW-$('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_LightboxLoader').width())/2});
                        
                        $('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_LightboxLoader').css('display', 'none');
                        $('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID).css('display', 'none');
                        
                        $('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID).fadeIn(LightboxDisplayTime, function(){                        
                            if (Media[no-1] != ''){
                                methods.loadLightboxMedia(no);      
                            }
                            else{
                                methods.loadLightboxImage(no);
                            }
                        }); 
                    },
                    hideLightbox:function(){// Hide Lightbox
                        if (itemLoaded){
                            $('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID).fadeOut(LightboxDisplayTime, function(){
                                currentItem = 0;
                                itemLoaded = false;
                                clearInterval(socialShareInterval);
                                $('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_LightboxContainer').css('opacity', 0);
                                $('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_Lightbox').html('');
                            });
                        }
                    },
                    loadLightboxImage:function(no){// Load Lightbox Image
                        var img = new Image();
                                                        
                        currentItem = no;
                        $('#DOP_NextGENWallGridGallery_ItemCount_'+ID).html(currentItem);
                        
                        $('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_LightboxLoader').css('display', 'block');
                                                
                        $(img).load(function(){
                            $('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_LightboxLoader').css('display', 'none');
                            $('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_Lightbox').html(this);
                            $('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_Lightbox img').attr('alt', CaptionTitle[no-1]);
                            
                            if (SocialShareEnabled == 'true'){
                                methods.showSocialShare();
                            }
                            $('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID).css('display', 'block');
                            ImageWidth = $(this).width();
                            ImageHeight = $(this).height();
                            $('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID).css('display', 'none');
                            
                            itemLoaded = true;
                            methods.showCaption(no);
                            methods.rpLightboxImage();
                            
                            $('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_LightboxContainer').stop(true, true).animate({'opacity': 1}, LightboxDisplayTime, function(){
                                if (prototypes.isIEBrowser() && CaptionText[no-1] != ''){
                                    methods.rpLightboxImage();
                                }
                            });
                        }).attr('src', Images[no-1]);
                    },
                    loadLightboxMedia:function(no){// Load Lightbox Media                          
                        currentItem = no;
                        $('#DOP_NextGENWallGridGallery_ItemCount_'+ID).html(currentItem);
                                                
                        $('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_LightboxLoader').css('display', 'none');
                        $('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_Lightbox').html(Media[no-1]);
                        
                        if (SocialShareEnabled == 'true'){
                            methods.showSocialShare();
                        }
                        
                        var iframeSRC =  $('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_Lightbox').children().attr('src');
                        
                        if (iframeSRC != null){
                            if (iframeSRC.indexOf('?') != -1){
                                $('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_Lightbox').children().attr('src', iframeSRC+'&wmode=transparent');
                            }
                            else{
                                $('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_Lightbox').children().attr('src', iframeSRC+'?wmode=transparent');                                
                            }
                        }

                        if ($('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_Lightbox').children().prop("tagName") != undefined && 
                            $('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_Lightbox').children().prop("tagName").toUpperCase() == 'IFRAME'){
                            ImageWidth = parseFloat($('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_Lightbox').children().attr('width'));
                            ImageHeight = parseFloat($('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_Lightbox').children().attr('height'));
                        }
                        else{
                            ImageWidth = 0;
                            ImageHeight = 0;
                        }

                        itemLoaded = true;
                        methods.showCaption(no);
                        methods.rpLightboxMedia();

                        $('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_LightboxContainer').stop(true, true).animate({'opacity': 1}, LightboxDisplayTime);
                    },
                    previousLightbox:function(){
                        var previousItem = currentItem-1;
                            
                        if (currentItem == 1){
                            previousItem = noItems;
                        }
                        
                        if (Links[previousItem-1] == ''){
                            $('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_LightboxContainer').stop(true, true).animate({'opacity': 0}, LightboxDisplayTime, function(){
                                if (Media[previousItem-1] != ''){
                                    methods.loadLightboxMedia(previousItem);
                                }
                                else{
                                    methods.loadLightboxImage(previousItem);
                                }
                            });                        
                        }
                        else{
                            currentItem = previousItem;
                            methods.previousLightbox();
                        }
                    },
                    nextLightbox:function(){
                        var nextItem = currentItem+1;
                            
                        if (currentItem == noItems){
                            nextItem = 1;
                        }
                            
                        if (Links[nextItem-1] == ''){
                            $('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_LightboxContainer').stop(true, true).animate({'opacity': 0}, LightboxDisplayTime, function(){
                                if (Media[nextItem-1] != ''){
                                    methods.loadLightboxMedia(nextItem);
                                }
                                else{
                                    methods.loadLightboxImage(nextItem);
                                }
                            });  
                        }
                        else{
                            currentItem = nextItem;
                            methods.nextLightbox();
                        }                                              
                    },
                    rpLightboxImage:function(){// Resize & Position Lightbox Image
                        var documentW, documentH, windowW, windowH, maxWidth, maxHeight, currW, currH;
                        
                        $('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID).css('display', 'none');
                        
                        if (LightboxPosition == 'document'){
                            documentW = $(document).width(); 
                            documentH = $(document).height();
                            windowW = $(window).width();
                            windowH = $(window).height();
                        }
                        else{      
                            documentW = $(Container).width(); 
                            documentH = $(Container).height();
                            windowW = $(Container).width();
                            windowH = $(Container).height();
                            $('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_LightboxLoader').css('position', 'absolute');
                        }
                        
                        $('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID).css('display', 'block');
                        maxWidth = windowW-($(window).width() <= 640 ? 1:LightboxMarginRight)-($(window).width() <= 640 ? 1:LightboxMarginLeft)-LightboxPaddingRight-LightboxPaddingLeft;
                        maxHeight = windowH-($(window).width() <= 640 ? 1:LightboxMarginTop)-($(window).width() <= 640 ? 1:LightboxMarginBottom)-LightboxPaddingTop-LightboxPaddingBottom-CaptionHeight;
                        
                        $('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID).width(documentW);
                        $('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID).height(documentH);
                        $('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_LightboxWindow').width(documentW);
                        $('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_LightboxWindow').height(documentH);
                        
                        $('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID).css('display', 'block');
                        $('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_LightboxLoader').css('display', 'block');
                        $('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_LightboxLoader').css({'margin-top': (windowH-$('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_LightboxLoader').height())/2,
                                                                                                                  'margin-left': (windowW-$('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_LightboxLoader').width())/2});
                        
                        $('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_LightboxLoader').css('display', 'none');
                        
                        if (itemLoaded){  
                            if (ImageWidth <= maxWidth && ImageHeight <= maxHeight){
                                currW = ImageWidth;
                                currH = ImageHeight;
                            }
                            else{
                                currH = maxHeight;
                                currW = (ImageWidth*maxHeight)/ImageHeight;

                                if (currW > maxWidth){
                                    currW = maxWidth;
                                    currH = (ImageHeight*maxWidth)/ImageWidth;
                                }
                            }

                            $('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_Lightbox img').width(currW);
                            $('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_Lightbox img').height(currH);
                            $('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_Lightbox img').css({'margin-top': LightboxPaddingTop,
                                                                                                                    'margin-left': LightboxPaddingLeft});
                            $('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_Lightbox').css({'height': $('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_Lightbox').children().height(),
                                                                                                                'width': $('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_Lightbox').children().width()});                                                                                        
                            methods.rpCaption();
                            $('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_LightboxContainer').width(currW+LightboxPaddingRight+LightboxPaddingLeft);
                            $('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_LightboxContainer').height(currH+LightboxPaddingTop+LightboxPaddingBottom+$('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_Caption').height());
                            $('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_LightboxBg').width(currW+LightboxPaddingRight+LightboxPaddingLeft);
                            $('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_LightboxBg').height(currH+LightboxPaddingTop+LightboxPaddingBottom+$('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_Caption').height());
                            
                            if (LightboxPosition == 'document'){
                                $('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_LightboxContainer').css({'margin-top': (windowH-$('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_LightboxContainer').height())/2+$(window).scrollTop(),
                                                                                                                             'margin-left': (windowW-$('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_LightboxContainer').width())/2+$(window).scrollLeft()});
                            }
                            else{
                                $('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_LightboxContainer').css({'margin-top': (windowH-$('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_LightboxContainer').height())/2,
                                                                                                                             'margin-left': (windowW-$('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_LightboxContainer').width())/2});
                            }
                            methods.rpLightboxNavigation();
                        }
                    },
                    rpLightboxMedia:function(){// Resize & Position Lightbox Media
                        var documentW, documentH, windowW, windowH, maxWidth, maxHeight, currW, currH;
                                                                                
                        $('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID).css('display', 'none');
                        
                        if (LightboxPosition == 'document'){
                            documentW = $(document).width(); 
                            documentH = $(document).height();
                            windowW = $(window).width();
                            windowH = $(window).height();
                        }
                        else{                  
                            documentW = $(Container).width(); 
                            documentH = $(Container).height();
                            windowW = $(Container).width();
                            windowH = $(Container).height();
                            $('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_LightboxContainer').css('position', 'absolute');
                        }
                                                                                
                        $('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID).css('display', 'block');
                        maxWidth = windowW-($(window).width() <= 640 ? 1:LightboxMarginRight)-($(window).width() <= 640 ? 1:LightboxMarginLeft)-LightboxPaddingRight-LightboxPaddingLeft;
                        maxHeight = windowH-($(window).width() <= 640 ? 1:LightboxMarginTop)-($(window).width() <= 640 ? 1:LightboxMarginBottom)-LightboxPaddingTop-LightboxPaddingBottom-CaptionHeight;
                                                                                                                                                
                        $('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID).width(documentW);
                        $('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID).height(documentH);
                        $('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_LightboxWindow').width(documentW);
                        $('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_LightboxWindow').height(documentH);
                        
                        $('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID).css('display', 'block');
                        $('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_LightboxLoader').css('display', 'block');
                        $('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_LightboxLoader').css({'margin-top': (windowH-$('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_LightboxLoader').height())/2,
                                                                                                                  'margin-left': (windowW-$('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_LightboxLoader').width())/2});
                        
                        $('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_LightboxLoader').css('display', 'none');
                                                
                        if (ImageWidth <= maxWidth && ImageHeight <= maxHeight){
                            currW = ImageWidth;
                            currH = ImageHeight;
                            
                            if (ImageWidth == 0 && ImageHeight == 0){
                                currW = $('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_Lightbox').children().width();
                                currH = $('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_Lightbox').children().height();
                            }
                        }
                        else{
                            currH = maxHeight;
                            currW = (ImageWidth*maxHeight)/ImageHeight;
                        
                            if (currW > maxWidth){
                                currW = maxWidth;
                                currH = (ImageHeight*maxWidth)/ImageWidth;
                            }
                        }
                        
                        $('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_Lightbox').children().width(currW);
                        $('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_Lightbox').children().height(currH);
                        $('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_Lightbox').children().css({'margin-top': LightboxPaddingTop,
                                                                                                                       'margin-left': LightboxPaddingLeft});
                        $('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_Lightbox').css({'height': currH,
                                                                                                            'width': currW});
                        
                        methods.rpCaption();
                                                                                                                  
                        $('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_LightboxContainer').width(currW+LightboxPaddingRight+LightboxPaddingLeft);
                        $('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_LightboxContainer').height(currH+LightboxPaddingTop+LightboxPaddingBottom+$('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_Caption').height());
                        $('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_LightboxBg').width(currW+LightboxPaddingRight+LightboxPaddingLeft);
                        $('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_LightboxBg').height(currH+LightboxPaddingTop+LightboxPaddingBottom+$('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_Caption').height());
                        
                        if (LightboxPosition == 'document'){
                            $('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_LightboxContainer').css({'margin-top': (windowH-$('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_LightboxContainer').height())/2+$(window).scrollTop(),
                                                                                                                         'margin-left': (windowW-$('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_LightboxContainer').width())/2+$(window).scrollLeft()});
                        }
                        else{
                            $('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_LightboxContainer').css({'margin-top': (windowH-$('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_LightboxContainer').height())/2,
                                                                                                                         'margin-left': (windowW-$('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_LightboxContainer').width())/2});
                        }                                                                                                                                                                                                                                             
                        methods.rpLightboxNavigation();
                    },
                    rpLightboxNavigation:function(){// Resize & Position Lightbox Navigation
                        $('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_LightboxNavigationButtons').css({'margin-top': ($('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_Lightbox').height()-$('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_LightboxNavigationButtons').children().height())/2+LightboxPaddingTop,
                                                                                                                             'margin-left': LightboxPaddingLeft,
                                                                                                                             'width': $('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_Lightbox').width()});
                        $('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_LightboxNavigationExtraButtons').css({'margin-top': LightboxPaddingTop,
                                                                                                                                  'margin-left': LightboxPaddingLeft,
                                                                                                                                  'width': $('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_Lightbox').width()});
                    },  
                    lightboxNavigationSwipe:function(){
                        var prev, curr, touch, initial, positionX;

                        $('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_LightboxContainer').bind('touchstart', function(e){
                            touch = e.originalEvent.touches[0];
                            prev = touch.clientX;
                            initial = parseFloat($('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_LightboxContainer').css('margin-left')); 
                        });

                        $('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_LightboxContainer').bind('touchmove', function(e){
                            e.preventDefault();
                            $('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_LightboxNavigation').css('opacity', 0);

                            touch = e.originalEvent.touches[0],
                            curr = touch.clientX,
                            positionX = curr>prev ? parseInt($('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_LightboxContainer').css('margin-left'))+(curr-prev):parseInt($('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_LightboxContainer').css('margin-left'))-(prev-curr);

                            prev = curr;
                            $('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_LightboxContainer').css('margin-left', positionX);
                        });

                        $('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_LightboxContainer').bind('touchend', function(e){
                            if (!prototypes.isChromeMobileBrowser()){
                                e.preventDefault();
                            }
                            $('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_LightboxNavigation').css('opacity', 1);
                                
                            if (parseFloat($('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_LightboxContainer').css('margin-left')) < 0){
                                $('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_LightboxContainer').css({'margin-left': initial, 'opacity': 0});
                                methods.nextLightbox();
                            }
                            else if (parseFloat($('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_LightboxContainer').css('margin-left'))+$('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_LightboxContainer').width() > $(window).width()){
                                $('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_LightboxContainer').css({'margin-left': initial, 'opacity': 0});
                                methods.previousLightbox();
                            }
                            else{
                                $('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_LightboxContainer').css('margin-left', initial);
                            }
                        });
                    },     

                    initCaption:function(){// Init Caption
                        $('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_Caption').css({'margin-left': LightboxPaddingLeft,
                                                                                                                         'bottom': LightboxPaddingBottom});
                        $('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_CaptionTitle').css('color', '#'+CaptionTitleColor);
                        $('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_CaptionText').css('color', '#'+CaptionTextColor);
                        $('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_CaptionTextContainer').jScrollPane();
                    },
                    showCaption:function(no){// Show Caption
                        $('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_CaptionTitle .title').html(CaptionTitle[no-1]);
                        $('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_CaptionText').html(CaptionText[no-1]);
                            
                        if (CaptionText[no-1] == ''){
                            $('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_CaptionTextContainer').css('display', 'none');
                        }
                        else{
                            $('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_CaptionTextContainer').css('display', 'block');
                        }
                    },  
                    rpCaption:function(){// Resize & Position Caption
                        $('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_CaptionTextContainer').height($('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_CaptionText').height());
                        var textHeight = CaptionHeight-$('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_CaptionTitle').height()-parseFloat($('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_CaptionTitle').css('margin-top'))-parseFloat($('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_CaptionTextContainer').css('margin-top'));
                        
                        $('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_Caption').width($('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_Lightbox').children().width());
                        
                        if ($('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_CaptionTextContainer').height() > textHeight){
                            $('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_CaptionTextContainer').height(textHeight);
                            $('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_CaptionTextContainer').jScrollPane();
                            $('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .jspDrag').css('background-color', '#'+CaptionScrollScrubColor);
                            $('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .jspTrack').css('background-color', '#'+CaptionScrollBgColor);
                        }
                        
                        setTimeout(function(){
                            $('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_CaptionTextContainer').jScrollPane();
                            $('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .jspDrag').css('background-color', '#'+CaptionScrollScrubColor);
                            $('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .jspTrack').css('background-color', '#'+CaptionScrollBgColor);
                        }, 100);
                    },     
                                        
                    initSocialShare:function(){
                        var HTML = new Array();
                        
                        if ($('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_LightboxSocialShare').html() == ''){
                            HTML.push('       <div class="addthis_toolbox addthis_default_style">');
                            HTML.push('            <a class="addthis_button" addthis:url="" addthis:title="">');
                            HTML.push('                <img src="'+SocialShareLightbox+'" alt="" />');
                            HTML.push('            </a>');
                            HTML.push('       </div>');
                        
                            $('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_LightboxSocialShare').html(HTML.join(''));
                        }
                    },
                    showSocialShare:function(){
                        var URL = window.location.href+(window.location.href.indexOf('?') != -1 ? '&':'?')+'dop_wall_grid_gallery_id='+ID+'&dop_wall_grid_gallery_share='+currentItem;
                        
                        if (window.addthis == undefined){
                            $.getScript( 'http://s7.addthis.com/js/250/addthis_widget.js' , function(){
                                if (window.addthis){ 
                                    window.addthis.ost = 0; 
                                    window.addthis.init();
                                    
                                    setTimeout(function(){
                                        window.addthis.update('share', 'url', URL);
                                        window.addthis.update('share', 'title', CaptionTitle[currentItem-1]);
                                    }, 100);

                                    $('#at15s').css('top', parseFloat($('#at15s').css('top'))-$(window).scrollTop());
                                } 
                            }); 
                        }
                        else{                                    
                            setTimeout(function(){
                                window.addthis.update('share', 'url', URL);
                                window.addthis.update('share', 'title', CaptionTitle[currentItem-1]);
                            }, 100);
                        }
                        
                        clearInterval(socialShareInterval);
                        socialShareInterval = setInterval(methods.rpSocialShare, 100);
                    },
                    rpSocialShare:function(){
                        $('#at15s').css('top', $('#DOP_NextGENWallGridGallery_LightboxWrapper_'+ID+' .DOP_NextGENWallGridGallery_LightboxSocialShare').offset().top-$(window).scrollTop());
                    }, 

                    initTooltip:function(){// Init Tooltip
                        var mousePositionX, mousePositionY, scrolledX = null, scrolledY = null;
                        
                        $('.DOP_NextGENWallGridGallery_ThumbnailsWrapper', Container).bind('mousemove', function(e){
                            mousePositionX = e.clientX-$(this).offset().left+parseInt($(this).css('margin-left'))+$(document).scrollLeft();
                            mousePositionY = e.clientY-$(this).offset().top+parseInt($(this).css('margin-top'))+$(document).scrollTop();
                            
                            $('.DOP_NextGENWallGridGallery_Tooltip', Container).css('margin-left', mousePositionX-10);
                            $('.DOP_NextGENWallGridGallery_Tooltip', Container).css('top', mousePositionY-$('.DOP_NextGENWallGridGallery_Tooltip', Container).height()-15);
                        });
                        
                        $(window).scroll(function(){
                            if(scrolledX != $(document).scrollLeft()){
                                mousePositionX -= scrolledX;
                                scrolledX = $(document).scrollLeft();
                                mousePositionX += scrolledX;
                            }
                            
                            if(scrolledY != $(document).scrollTop()){
                                mousePositionY -= scrolledY;
                                scrolledY = $(document).scrollTop();
                                mousePositionY += scrolledY;
                            }
                            
                            $('.DOP_NextGENWallGridGallery_Tooltip', Container).css('margin-left', mousePositionX-10);
                            $('.DOP_NextGENWallGridGallery_Tooltip', Container).css('top', mousePositionY-$('.DOP_NextGENWallGridGallery_Tooltip', Container).height()-15);
                        });
                    },
                    showTooltip:function(no){// Resize, Position & Display the Tooltip
                        var HTML = new Array();
                        HTML.push(CaptionTitle[no]);
                        HTML.push('<div class="DOP_NextGENWallGridGallery_Tooltip_ArrowBorder"></div>');
                        HTML.push('<div class="DOP_NextGENWallGridGallery_Tooltip_Arrow"></div>');
                        $('.DOP_NextGENWallGridGallery_Tooltip', Container).html(HTML.join(""));

                        if (TooltipBgColor != 'css'){
                            $('.DOP_NextGENWallGridGallery_Tooltip', Container).css('background-color', '#'+TooltipBgColor);
                            $('.DOP_NextGENWallGridGallery_Tooltip_Arrow', Container).css('border-top-color', '#'+TooltipBgColor);
                        }
                        if (TooltipStrokeColor != 'css'){
                            $('.DOP_NextGENWallGridGallery_Tooltip', Container).css('border-color', '#'+TooltipStrokeColor);
                            $('.DOP_NextGENWallGridGallery_Tooltip_ArrowBorder', Container).css('border-top-color', '#'+TooltipStrokeColor);
                        }
                        if (TooltipTextColor != 'css'){
                            $('.DOP_NextGENWallGridGallery_Tooltip', Container).css('color', '#'+TooltipTextColor);
                        }
                        if (CaptionTitle[no] != ''){
                            $('.DOP_NextGENWallGridGallery_Tooltip', Container).css('display', 'block');
                        }
                    }
                  },        
                  
        prototypes = {
                        resizeItem:function(parent, child, cw, ch, dw, dh, pos){// Resize & Position an item (the item is 100% visible)
                            var currW = 0, currH = 0;

                            if (dw <= cw && dh <= ch){
                                currW = dw;
                                currH = dh;
                            }
                            else{
                                currH = ch;
                                currW = (dw*ch)/dh;

                                if (currW > cw){
                                    currW = cw;
                                    currH = (dh*cw)/dw;
                                }
                            }

                            child.width(currW);
                            child.height(currH);
                            switch(pos.toLowerCase()){
                                case 'top':
                                    prototypes.topItem(parent, child, ch);
                                    break;
                                case 'bottom':
                                    prototypes.bottomItem(parent, child, ch);
                                    break;
                                case 'left':
                                    prototypes.leftItem(parent, child, cw);
                                    break;
                                case 'right':
                                    prototypes.rightItem(parent, child, cw);
                                    break;
                                case 'horizontal-center':
                                    prototypes.hCenterItem(parent, child, cw);
                                    break;
                                case 'vertical-center':
                                    prototypes.vCenterItem(parent, child, ch);
                                    break;
                                case 'center':
                                    prototypes.centerItem(parent, child, cw, ch);
                                    break;
                                case 'top-left':
                                    prototypes.tlItem(parent, child, cw, ch);
                                    break;
                                case 'top-center':
                                    prototypes.tcItem(parent, child, cw, ch);
                                    break;
                                case 'top-right':
                                    prototypes.trItem(parent, child, cw, ch);
                                    break;
                                case 'middle-left':
                                    prototypes.mlItem(parent, child, cw, ch);
                                    break;
                                case 'middle-right':
                                    prototypes.mrItem(parent, child, cw, ch);
                                    break;
                                case 'bottom-left':
                                    prototypes.blItem(parent, child, cw, ch);
                                    break;
                                case 'bottom-center':
                                    prototypes.bcItem(parent, child, cw, ch);
                                    break;
                                case 'bottom-right':
                                    prototypes.brItem(parent, child, cw, ch);
                                    break;
                            }
                        },
                        resizeItem2:function(parent, child, cw, ch, dw, dh, pos){// Resize & Position an item (the item covers all the container)
                            var currW = 0, currH = 0;

                            currH = ch;
                            currW = (dw*ch)/dh;

                            if (currW < cw){
                                currW = cw;
                                currH = (dh*cw)/dw;
                            }

                            child.width(currW);
                            child.height(currH);

                            switch(pos.toLowerCase()){
                                case 'top':
                                    prototypes.topItem(parent, child, ch);
                                    break;
                                case 'bottom':
                                    prototypes.bottomItem(parent, child, ch);
                                    break;
                                case 'left':
                                    prototypes.leftItem(parent, child, cw);
                                    break;
                                case 'right':
                                    prototypes.rightItem(parent, child, cw);
                                    break;
                                case 'horizontal-center':
                                    prototypes.hCenterItem(parent, child, cw);
                                    break;
                                case 'vertical-center':
                                    prototypes.vCenterItem(parent, child, ch);
                                    break;
                                case 'center':
                                    prototypes.centerItem(parent, child, cw, ch);
                                    break;
                                case 'top-left':
                                    prototypes.tlItem(parent, child, cw, ch);
                                    break;
                                case 'top-center':
                                    prototypes.tcItem(parent, child, cw, ch);
                                    break;
                                case 'top-right':
                                    prototypes.trItem(parent, child, cw, ch);
                                    break;
                                case 'middle-left':
                                    prototypes.mlItem(parent, child, cw, ch);
                                    break;
                                case 'middle-right':
                                    prototypes.mrItem(parent, child, cw, ch);
                                    break;
                                case 'bottom-left':
                                    prototypes.blItem(parent, child, cw, ch);
                                    break;
                                case 'bottom-center':
                                    prototypes.bcItem(parent, child, cw, ch);
                                    break;
                                case 'bottom-right':
                                    prototypes.brItem(parent, child, cw, ch);
                                    break;
                            }
                        },

                        topItem:function(parent, child, ch){// Position item on Top
                            parent.height(ch);
                            child.css('margin-top', 0);
                        },
                        bottomItem:function(parent, child, ch){// Position item on Bottom
                            parent.height(ch);
                            child.css('margin-top', ch-child.height());
                        },
                        leftItem:function(parent, child, cw){// Position item on Left
                            parent.width(cw);
                            child.css('margin-left', 0);
                        },
                        rightItem:function(parent, child, cw){// Position item on Right
                            parent.width(cw);
                            child.css('margin-left', parent.width()-child.width());
                        },
                        hCenterItem:function(parent, child, cw){// Position item on Horizontal Center
                            parent.width(cw);
                            child.css('margin-left', (cw-child.width())/2);
                        },
                        vCenterItem:function(parent, child, ch){// Position item on Vertical Center
                            parent.height(ch);
                            child.css('margin-top', (ch-child.height())/2);
                        },
                        centerItem:function(parent, child, cw, ch){// Position item on Center
                            prototypes.hCenterItem(parent, child, cw);
                            prototypes.vCenterItem(parent, child, ch);
                        },
                        tlItem:function(parent, child, cw, ch){// Position item on Top-Left
                            prototypes.topItem(parent, child, ch);
                            prototypes.leftItem(parent, child, cw);
                        },
                        tcItem:function(parent, child, cw, ch){// Position item on Top-Center
                            prototypes.topItem(parent, child, ch);
                            prototypes.hCenterItem(parent, child, cw);
                        },
                        trItem:function(parent, child, cw, ch){// Position item on Top-Right
                            prototypes.topItem(parent, child, ch);
                            prototypes.rightItem(parent, child, cw);
                        },
                        mlItem:function(parent, child, cw, ch){// Position item on Middle-Left
                            prototypes.vCenterItem(parent, child, ch);
                            prototypes.leftItem(parent, child, cw);
                        },
                        mrItem:function(parent, child, cw, ch){// Position item on Middle-Right
                            prototypes.vCenterItem(parent, child, ch);
                            prototypes.rightItem(parent, child, cw);
                        },
                        blItem:function(parent, child, cw, ch){// Position item on Bottom-Left
                            prototypes.bottomItem(parent, child, ch);
                            prototypes.leftItem(parent, child, cw);
                        },
                        bcItem:function(parent, child, cw, ch){// Position item on Bottom-Center
                            prototypes.bottomItem(parent, child, ch);
                            prototypes.hCenterItem(parent, child, cw);
                        },
                        brItem:function(parent, child, cw, ch){// Position item on Bottom-Right
                            prototypes.bottomItem(parent, child, ch);
                            prototypes.rightItem(parent, child, cw);
                        },
                        
                        touchNavigation:function(parent, child){// One finger navigation for touchscreen devices
                            var prevX, prevY, currX, currY, touch, childX, childY;
                            
                            parent.bind('touchstart', function(e){
                                touch = e.originalEvent.touches[0];
                                prevX = touch.clientX;
                                prevY = touch.clientY;
                            });

                            parent.bind('touchmove', function(e){                                
                                touch = e.originalEvent.touches[0];
                                currX = touch.clientX;
                                currY = touch.clientY;
                                childX = currX>prevX ? parseInt(child.css('margin-left'))+(currX-prevX):parseInt(child.css('margin-left'))-(prevX-currX);
                                childY = currY>prevY ? parseInt(child.css('margin-top'))+(currY-prevY):parseInt(child.css('margin-top'))-(prevY-currY);

                                if (childX < (-1)*(child.width()-parent.width())){
                                    childX = (-1)*(child.width()-parent.width());
                                }
                                else if (childX > 0){
                                    childX = 0;
                                }
                                else{                                    
                                    e.preventDefault();
                                }

                                if (childY < (-1)*(child.height()-parent.height())){
                                    childY = (-1)*(child.height()-parent.height());
                                }
                                else if (childY > 0){
                                    childY = 0;
                                }
                                else{                                    
                                    e.preventDefault();
                                }

                                prevX = currX;
                                prevY = currY;

                                if (parent.width() < child.width()){
                                    child.css('margin-left', childX);
                                }
                                
                                if (parent.height() < child.height()){
                                    child.css('margin-top', childY);
                                }
                            });

                            parent.bind('touchend', function(e){
                                if (!prototypes.isChromeMobileBrowser()){
                                    e.preventDefault();
                                }
                            });
                        },

			rgb2hex:function(rgb){// Convert RGB color to HEX
                            var hexDigits = new Array('0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f');

                            rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);

                            return (isNaN(rgb[1]) ? '00':hexDigits[(rgb[1]-rgb[1]%16)/16]+hexDigits[rgb[1]%16])+
                                   (isNaN(rgb[2]) ? '00':hexDigits[(rgb[2]-rgb[2]%16)/16]+hexDigits[rgb[2]%16])+
                                   (isNaN(rgb[3]) ? '00':hexDigits[(rgb[3]-rgb[3]%16)/16]+hexDigits[rgb[3]%16]);
			},
			idealTextColor:function(bgColor){// Set text color depending on the background color
			    var rgb = /rgb\((\d+).*?(\d+).*?(\d+)\)/.exec(bgColor);
    
			    if (rgb != null){
			        return parseInt(rgb[1], 10)+parseInt(rgb[2], 10)+parseInt(rgb[3], 10) < 3*256/2 ? 'white' : 'black';
			    }
			    else{
			        return parseInt(bgColor.substring(0, 2), 16)+parseInt(bgColor.substring(2, 4), 16)+parseInt(bgColor.substring(4, 6), 16) < 3*256/2 ? 'white' : 'black';
			    }
			},

                        dateDiference:function(date1, date2){// Diference between 2 dates
                            var time1 = date1.getTime(),
                            time2 = date2.getTime(),
                            diff = Math.abs(time1-time2),
                            one_day = 1000*60*60*24;
                            
                            return parseInt(diff/(one_day))+1;
                        },
                        previousTime:function(time, size, type){
                            var timePieces = time.split(':'),
                            hours = parseInt(timePieces[0], 10),
                            minutes = timePieces[1] == undefined ? 0:parseInt(timePieces[1], 10),
                            seconds = timePieces[2] == undefined ? 0:parseInt(timePieces[2], 10);
                            
                            switch (type){
                                case 'seconds':
                                    seconds = seconds-size;
                                    
                                    if (seconds < 0){
                                        seconds = 60+seconds;
                                        minutes = minutes-1;
                                        
                                        if (minutes < 0){
                                            minutes = 60+minutes;
                                            hours = hours-1 < 0 ? 0:hours-1;
                                        }
                                    }
                                    break;
                                case 'minutes':
                                        minutes = minutes-size;
                                        
                                        if (minutes < 0){
                                            minutes = 60+minutes;
                                            hours = hours-1 < 0 ? 0:hours-1;
                                        }
                                    break;
                                default:
                                    hours = hours-size < 0 ? 0:hours-size;
                            }
                            
                            return prototypes.timeLongItem(hours)+(timePieces[1] == undefined ? '':':'+prototypes.timeLongItem(minutes)+(timePieces[2] == undefined ? '':':'+prototypes.timeLongItem(seconds)));
                        },
                        noDays:function(date1, date2){// Returns no of days between 2 days
                            var time1 = date1.getTime(),
                            time2 = date2.getTime(),
                            diff = Math.abs(time1-time2),
                            one_day = 1000*60*60*24;
                            
                            return Math.round(diff/(one_day))+1;
                        },
                        timeLongItem:function(item){// Return day/month with 0 in front if smaller then 10
                            if (item < 10){
                                return '0'+item;
                            }
                            else{
                                return item;
                            }
                        },
                        timeToAMPM:function(item){// Returns time in AM/PM format
                            var hour = parseInt(item.split(':')[0], 10),
                            minutes = item.split(':')[1],
                            result = '';
                            
                            if (hour == 0){
                                result = '12';
                            }
                            else if (hour > 12){
                                result = prototypes.timeLongItem(hour-12);
                            }
                            else{
                                result = prototypes.timeLongItem(hour);
                            }
                            
                            result += ':'+minutes+' '+(hour < 12 ? 'AM':'PM');
                            
                            return result;
                        },

                        stripslashes:function(str){// Remove slashes from string
                            return (str + '').replace(/\\(.?)/g, function (s, n1) {
                                switch (n1){
                                    case '\\':
                                        return '\\';
                                    case '0':
                                        return '\u0000';
                                    case '':
                                        return '';
                                    default:
                                        return n1;
                                }
                            });
                        },
                        
                        randomize:function(theArray){// Randomize the items of an array
                            theArray.sort(function(){
                                return 0.5-Math.random();
                            });
                            return theArray;
                        },
                        randomString:function(string_length){// Create a string with random elements
                            var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz",
                            random_string = '';

                            for (var i=0; i<string_length; i++){
                                var rnum = Math.floor(Math.random()*chars.length);
                                random_string += chars.substring(rnum,rnum+1);
                            }
                            return random_string;
                        },

                        isIE8Browser:function(){// Detect the browser IE8
                            var isIE8 = false,
                            agent = navigator.userAgent.toLowerCase();

                            if (agent.indexOf('msie 8') != -1){
                                isIE8 = true;
                            }
                            return isIE8;
                        },
                        isIEBrowser:function(){// Detect the browser IE
                            var isIE = false,
                            agent = navigator.userAgent.toLowerCase();

                            if (agent.indexOf('msie') != -1){
                                isIE = true;
                            }
                            return isIE;
                        },
                        isChromeMobileBrowser:function(){// Detect the browser Mobile Chrome
                            var isChromeMobile = false,
                            agent = navigator.userAgent.toLowerCase();
                            
                            if ((agent.indexOf('chrome') != -1 || agent.indexOf('crios') != -1) && prototypes.isTouchDevice()){
                                isChromeMobile = true;
                            }
                            return isChromeMobile;
                        },
                        isAndroid:function(){// Detect the browser Mobile Chrome
                            var isAndroid = false,
                            agent = navigator.userAgent.toLowerCase();

                            if (agent.indexOf('android') != -1){
                                isAndroid = true;
                            }
                            return isAndroid;
                        },
                        isTouchDevice:function(){// Detect touchscreen devices
                            var os = navigator.platform;
                            
                            if (os.toLowerCase().indexOf('win') != -1){
                                return window.navigator.msMaxTouchPoints;
                            }
                            else {
                                return 'ontouchstart' in document;
                            }
                        },

                        openLink:function(url, target){// Open a link
                            switch (target.toLowerCase()){
                                case '_blank':
                                    window.open(url);
                                    break;
                                case '_top':
                                    top.location.href = url;
                                    break;
                                case '_parent':
                                    parent.location.href = url;
                                    break;
                                default:    
                                    window.location = url;
                            }
                        },

                        validateCharacters:function(str, allowedCharacters){// Verify if a string contains allowed characters
                            var characters = str.split(''), i;

                            for (i=0; i<characters.length; i++){
                                if (allowedCharacters.indexOf(characters[i]) == -1){
                                    return false;
                                }
                            }
                            return true;
                        },
                        cleanInput:function(input, allowedCharacters, firstNotAllowed, min){// Remove characters that aren't allowed from a string
                            var characters = $(input).val().split(''),
                            returnStr = '', i, startIndex = 0;

                            if (characters.length > 1 && characters[0] == firstNotAllowed){
                                startIndex = 1;
                            }
                            
                            for (i=startIndex; i<characters.length; i++){
                                if (allowedCharacters.indexOf(characters[i]) != -1){
                                    returnStr += characters[i];
                                }
                            }
                                
                            if (min > returnStr){
                                returnStr = min;
                            }
                            
                            $(input).val(returnStr);
                        },
                        validEmail:function(email){// Validate email
                            var filter = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
                            
                            if (filter.test(email)){
                                return true;
                            }
                            return false;
                        },
                        
                        $_GET:function(variable){// Parse $_GET variables
                            var url = window.location.href.split('?')[1],
                            variables = url != undefined ? url.split('&'):[],
                            i; 
                            
                            for (i=0; i<variables.length; i++){
                                if (variables[i].indexOf(variable) != -1){
                                    return variables[i].split('=')[1];
                                    break;
                                }
                            }
                            
                            return undefined;
                        },
                        acaoBuster:function(dataURL){// Access-Control-Allow-Origin buster
                            var topURL = window.location.href,
                            pathPiece1 = '', pathPiece2 = '';
                            
                            if (prototypes.getDomain(topURL) == prototypes.getDomain(dataURL)){
                                if (dataURL.indexOf('https') != -1 || dataURL.indexOf('http') != -1){
                                    if (topURL.indexOf('http://www.') != -1){
                                        pathPiece1 = 'http://www.';
                                    }
                                    else if (topURL.indexOf('http://') != -1){
                                        pathPiece1 = 'http://';
                                    }
                                    else if (topURL.indexOf('https://www.') != -1){
                                        pathPiece1 = 'https://www.';
                                    }
                                    else if (topURL.indexOf('https://') != -1){
                                        pathPiece1 = 'https://';
                                    }

                                    if (dataURL.indexOf('http://www.') != -1){
                                        pathPiece2 = dataURL.split('http://www.')[1];
                                    }
                                    else if (dataURL.indexOf('http://') != -1){
                                        pathPiece2 = dataURL.split('http://')[1];
                                    }
                                    else if (dataURL.indexOf('https://www.') != -1){
                                        pathPiece2 = dataURL.split('https://www.')[1];
                                    }
                                    else if (dataURL.indexOf('https://') != -1){
                                        pathPiece2 = dataURL.split('https://')[1];
                                    }

                                    return pathPiece1+pathPiece2;
                                }
                                else{
                                    return dataURL;
                                }
                            }
                            else{
                                return dataURL;
                            }
                        },
                        getDomain:function(url, includeSubdomain){
                            var domain = url;
                            includeSubdomain = includeSubdomain == undefined ? true:false;
 
                            domain = domain.replace(new RegExp(/^\s+/),""); // Remove white spaces from the begining of the url.
                            domain = domain.replace(new RegExp(/\s+$/),""); // Remove white spaces from the end of the url.
                            domain = domain.replace(new RegExp(/\\/g),"/"); // If found , convert back slashes to forward slashes.
                            domain = domain.replace(new RegExp(/^http\:\/\/|^https\:\/\/|^ftp\:\/\//i),""); // If there, removes 'http://', 'https://' or 'ftp://' from the begining.
                            domain = domain.replace(new RegExp(/^www\./i),""); // If there, removes 'www.' from the begining.
                            domain = domain.replace(new RegExp(/\/(.*)/),""); // Remove complete string from first forward slaash on.

                            return domain;
                        },
                        isSubdomain:function(url){
                            var subdomain;
 
                            url = url.replace(new RegExp(/^\s+/),""); // Remove white spaces from the begining of the url.
                            url = url.replace(new RegExp(/\s+$/),""); // Remove white spaces from the end of the url.
                            url = url.replace(new RegExp(/\\/g),"/"); // If found , convert back slashes to forward slashes.
                            url = url.replace(new RegExp(/^http\:\/\/|^https\:\/\/|^ftp\:\/\//i),""); // If there, removes 'http://', 'https://' or 'ftp://' from the begining.
                            url = url.replace(new RegExp(/^www\./i),""); // If there, removes 'www.' from the begining.
                            url = url.replace(new RegExp(/\/(.*)/),""); // Remove complete string from first forward slaash on.
 
                            if (url.match(new RegExp(/\.[a-z]{2,3}\.[a-z]{2}$/i))){ // Remove '.??.??' or '.???.??' from end - e.g. '.CO.UK', '.COM.AU'
                                url = url.replace(new RegExp(/\.[a-z]{2,3}\.[a-z]{2}$/i),"");
                            }
                            else if (url.match(new RegExp(/\.[a-z]{2,4}$/i))){ // Removes '.??' or '.???' or '.????' from end - e.g. '.US', '.COM', '.INFO'
                                url = url.replace(new RegExp(/\.[a-z]{2,4}$/i),"");
                            }
                            subdomain = (url.match(new RegExp(/\./g))) ? true : false; // Check to see if there is a dot '.' left in the string.

                            return(subdomain);
                        },
                        
                        doHideBuster:function(item){// Make all parents & current item visible
                            var parent = item.parent(),
                            items = new Array();
                                
                            if (item.prop('tagName') != undefined && item.prop('tagName').toLowerCase() != 'body'){
                                items = prototypes.doHideBuster(parent);
                            }
                            
                            if (item.css('display') == 'none'){
                                item.css('display', 'block');
                                items.push(item);
                            }
                            
                            return items;
                        },
                        undoHideBuster:function(items){// Hide items in the array
                            var i;
                            
                            for (i=0; i<items.length; i++){
                                items[i].css('display', 'none');
                            }
                        },
                       
                        setCookie:function(c_name, value, expiredays){// Set cookie (name, value, expire in no days)
                            var exdate = new Date();
                            exdate.setDate(exdate.getDate()+expiredays);

                            document.cookie = c_name+"="+escape(value)+((expiredays==null) ? "" : ";expires="+exdate.toUTCString())+";javahere=yes;path=/";
                        },
                        readCookie:function(name){// Read cookie (name) 
                            var nameEQ = name+"=",
                            ca = document.cookie.split(";");

                            for (var i=0; i<ca.length; i++){
                                var c = ca[i];

                                while (c.charAt(0)==" "){
                                    c = c.substring(1,c.length);            
                                } 

                                if (c.indexOf(nameEQ) == 0){
                                    return unescape(c.substring(nameEQ.length, c.length));
                                } 
                            }
                            return null;
                        },
                        deleteCookie:function(c_name, path, domain){// Delete cookie (name, path, domain)
                            if (readCookie(c_name)){
                                document.cookie = c_name+"="+((path) ? ";path="+path:"")+((domain) ? ";domain="+domain:"")+";expires=Thu, 01-Jan-1970 00:00:01 GMT";
                            }
                        }
                    };

        return methods.init.apply(this);
    }
})(jQuery);
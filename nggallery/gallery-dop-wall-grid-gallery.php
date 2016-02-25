<?php
/*
* Title                   : Wall/Grid Gallery (WordPress NextGEN Gallery Template)
* Version                 : 1.5
* File                    : gallery-dop-wall-grid-gallery.js
* File Version            : 1.4
* Created / Last Modified : 05 May 2013
* Author                  : Dot on Paper
* Copyright               : © 2012 Dot on Paper
* Website                 : http://www.dotonpaper.net
* Description             : NextGen Gallery Template.
*/

    if (!defined ('ABSPATH')) die ('No direct access allowed');
    
    // Register Styles.
    wp_register_style('DOPNGWGG_JScrollPaneStyle', get_template_directory_uri().'/nggallery/libraries/gui/css/jquery.jscrollpane.css');
    wp_register_style('DOPNGWGG_NextGENWallGridGalleryStyle', get_template_directory_uri().'/nggallery/assets/gui/css/jquery.dop.NextGENWallGridGallery.css');
    // Register JavaScript.
    wp_register_script('DOPNGWGG_MouseWheelJS', get_template_directory_uri().'/nggallery/libraries/js/jquery.mousewheel.js', array('jquery'), false, true);
    wp_register_script('DOPNGWGG_JScrollPaneJS', get_template_directory_uri().'/nggallery/libraries/js/jquery.jscrollpane.min.js', array('jquery'), false, true);
    wp_register_script('DOPNGWGG_NextGENWallGridGalleryJS', get_template_directory_uri().'/nggallery/assets/js/jquery.dop.NextGENWallGridGallery.js', array('jquery'), false, true);

    // Enqueue Styles.
//    wp_enqueue_style('DOPNGWGG_JScrollPaneStyle');
//    wp_enqueue_style('DOPNGWGG_NextGENWallGridGalleryStyle');
   
    // Enqueue JavaScript.
    if (!wp_script_is('jquery', 'queue')){
        wp_enqueue_script('jquery');
    }
//    wp_enqueue_script('DOPNGWGG_MouseWheelJS');
//    wp_enqueue_script('DOPNGWGG_JScrollPaneJS');
//    wp_enqueue_script('DOPNGWGG_NextGENWallGridGalleryJS');
        
    if (!empty ($gallery)){                
?>
<link rel="stylesheet" type="text/css" href="<?php echo get_template_directory_uri(); ?>/nggallery/libraries/gui/css/jquery.jscrollpane.css" />
<link rel="stylesheet" type="text/css" href="<?php echo get_template_directory_uri(); ?>/nggallery/assets/gui/css/jquery.dop.NextGENWallGridGallery.css" />
<script type="text/JavaScript" src="<?php echo get_template_directory_uri(); ?>/nggallery/libraries/js/jquery.mousewheel.js"></script>
<script type="text/JavaScript" src="<?php echo get_template_directory_uri(); ?>/nggallery/libraries/js/jquery.jscrollpane.min.js"></script>
<script type="text/JavaScript" src="<?php echo get_template_directory_uri(); ?>/nggallery/assets/js/jquery.dop.NextGENWallGridGallery.js"></script>
<script type="text/JavaScript">
    var DOPNextGENWallGridGallerySettings<?php echo $gallery->ID;?> = {
        "Width": 900, // Width (value in pixels). Default value: 900. Set the width of the gallery.
        "Height": 0, // Height (value in pixels). Default value: 0. Set the height of the gallery. If you set the value to 0 all thumbnails are going to be displayed.
        "BgColor": "ffffff", // Background Color (color hex code). Default value: f1f1f1. Set gallery background color.
        "BgAlpha": 100, // Background Alpha (value from 0 to 100). Default value: 100. Set gallery background alpha.
        "NoLines": 3, // Number of Lines (auto, number). Default value: 3. Set the number of lines for the grid.
        "NoColumns": 4, // Number of Columns (auto, number). Default value: 4. Set the number of columns for the grid.
        "ImagesOrder": "normal", // Images Order (normal, random). Default value: normal. Set images order.
        "ResponsiveEnabled": "true", // Responsive Enabled (true, false). Default value: true. Enable responsive layout.
        "ThumbnailsSpacing": 15, // Thumbnails Spacing (value in pixels). Default value: 15. Set the space between thumbnails.
        "ThumbnailsPaddingTop": 0, // Thumbnails Padding Top (value in pixels). Default value: 0. Set the top padding for the thumbnails.
        "ThumbnailsPaddingRight": 0, // Thumbnails Padding Right (value in pixels). Default value: 0. Set the right padding for the thumbnails.
        "ThumbnailsPaddingBottom": 0, // Thumbnails Padding Bottom (value in pixels). Default value: 0. Set the bottom padding for the thumbnails.
        "ThumbnailsPaddingLeft": 0, // Thumbnails Padding Left (value in pixels). Default value: 0. Set the left padding for the thumbnails.
        "ThumbnailsNavigation": "mouse", // Thumbnails Navigation (mouse, scroll). Default value: mouse. Set how you navigate through the thumbnails.
        "ThumbnailsScrollScrubColor": "777777", // Thumbnails Scroll Scrub Color (color hex code). Default value: 777777. Set the scroll scrub color.
        "ThumbnailsScrollBarColor": "e0e0e0", // Thumbnails Scroll Bar Color (color hex code). Default value: e0e0e0. Set the scroll bar color.
        "ThumbnailsInfo": "tooltip", // Info Thumbnails Display (none, tooltip, label). Default value: tooltip. Display a small info text on the thumbnails, a tooltip or a label on bottom.
        "ThumbnailLoader": "<?php echo get_template_directory_uri()?>/nggallery/assets/gui/images/ThumbnailLoader.gif", // Thumbnail Loader (path to image). Set the loader for the thumbnails.
        "ThumbnailWidth": 200, // Thumbnail Width (the size in pixels). Default value: 200. Set the width of a thumbnail.
        "ThumbnailHeight": 100, // Thumbnail Height (the size in pixels). Default value: 100. Set the height of a thumbnail.
        "ThumbnailWidthMobile": 100, // Mobile Thumbnail Width (the size in pixels). Default value: 100. Set the width of a thumbnail on mobile devices.
        "ThumbnailHeightMobile": 50, // Mobile Thumbnail Height (the size in pixels). Default value: 50. Set the height of a thumbnail on mobile devices.
        "ThumbnailAlpha": 80, // Thumbnail Alpha (value from 0 to 100). Default value: 80. Set the transparency of a thumbnail.
        "ThumbnailAlphaHover": 100, // Thumbnail Alpha Hover (value from 0 to 100). Default value: 100. Set the transparency of a thumbnail when hover.
        "ThumbnailBgColor": "cccccc", // Thumbnail Background Color (color hex code). Default value: cccccc. Set the color of a thumbnail's background.
        "ThumbnailBgColorHover": "000000", // Thumbnail Background Color Hover (color hex code). Default value: 000000. Set the color of a thumbnail's background when hover.
        "ThumbnailBorderSize": 0, // Thumbnail Border Size (value in pixels). Default value: 0. Set the size of a thumbnail's border.
        "ThumbnailBorderColor": "cccccc", // Thumbnail Border Color (color hex code). Default value: cccccc. Set the color of a thumbnail's border.
        "ThumbnailBorderColorHover": "000000", // Thumbnail Border Color Hover (color hex code). Default value: 000000. Set the color of a thumbnail's border when hover.
        "ThumbnailPaddingTop": 3, // Thumbnail Padding Top (value in pixels). Default value: 3. Set top padding value of a thumbnail.
        "ThumbnailPaddingRight": 3, // Thumbnail Padding Right (value in pixels). Default value: 3. Set right padding value of a thumbnail.
        "ThumbnailPaddingBottom": 3, // Thumbnail Padding Bottom (value in pixels). Default value: 3. Set bottom padding value of a thumbnail.
        "ThumbnailPaddingLeft": 3,  // Thumbnail Padding Left (value in pixels). Default value: 3. Set left padding value of a thumbnail.
        "LightboxPosition": "document", // Lightbox Position (document, gallery). Default value: document. If the value is document the lightbox is displayed over the web page fitting in the browser's window, else the lightbox is displayed in the gallery's container.
        "LightboxWindowColor": "000000", // Lightbox Window Color (color hex code). Default value: 000000. Set the color for the lightbox window.
        "LightboxWindowAlpha": 80, // Lightbox Window Alpha (value from 0 to 100). Default value: 80. Set the transparency for the lightbox window.
        "LightboxLoader": "<?php echo get_template_directory_uri()?>/nggallery/assets/gui/images/LightboxLoader.gif", // Lightbox Loader (path to image). Set the loader for the lightbox image.
        "LightboxBgColor": "000000", // Lightbox Background Color (color hex code). Default value: 000000. Set the color for the lightbox background.
        "LightboxBgAlpha": 100, // Lightbox Background Alpha (value from 0 to 100). Default value: 100. Set the transparency for the lightbox background.
        "LightboxMarginTop": 70, // Lightbox Margin Top (value in pixels). Default value: 70. Set top margin value for the lightbox.
        "LightboxMarginRight": 70, // Lightbox Margin Right (value in pixels). Default value: 70. Set right margin value for the lightbox.
        "LightboxMarginBottom": 70, // Lightbox Margin Bottom (value in pixels). Default value: 70. Set bottom margin value for the lightbox.
        "LightboxMarginLeft": 70, // Lightbox Margin Left (value in pixels). Default value: 70. Set top left value for the lightbox.
        "LightboxPaddingTop": 10, // Lightbox Padding Top (value in pixels). Default value: 10. Set top padding value for the lightbox.
        "LightboxPaddingRight": 10, // Lightbox Padding Right (value in pixels). Default value: 10. Set right padding value for the lightbox.
        "LightboxPaddingBottom": 10, // Lightbox Padding Bottom (value in pixels). Default value: 10. Set bottom padding value for the lightbox.
        "LightboxPaddingLeft": 10, // Lightbox Padding Left (value in pixels). Default value: 10. Set left padding value for the lightbox.
        "LightboxNavigationPrev": "<?php echo get_template_directory_uri()?>/nggallery/assets/gui/images/LightboxPrev.png", // Lightbox Navigation Previous Button Image (path to image). Upload the image for lightbox navigation's previous button.
        "LightboxNavigationPrevHover": "<?php echo get_template_directory_uri()?>/nggallery/assets/gui/images/LightboxPrevHover.png", // Lightbox Navigation Previous Button Hover Image (path to image). Upload the image for lightbox navigation's previous hover button.
        "LightboxNavigationNext": "<?php echo get_template_directory_uri()?>/nggallery/assets/gui/images/LightboxNext.png", // Lightbox Navigation Next Button Image (path to image). Upload the image for lightbox navigation's next button.
        "LightboxNavigationNextHover": "<?php echo get_template_directory_uri()?>/nggallery/assets/gui/images/LightboxNextHover.png", // Lightbox Navigation Next Button Hover Image (path to image). Upload the image for lightbox navigation's next hover button.
        "LightboxNavigationClose": "<?php echo get_template_directory_uri()?>/nggallery/assets/gui/images/LightboxClose.png", // Lightbox Navigation Close Button Image (path to image). Upload the image for lightbox navigation's close button.
        "LightboxNavigationCloseHover": "<?php echo get_template_directory_uri()?>/nggallery/assets/gui/images/LightboxCloseHover.png", // Lightbox Navigation Close Button Hover Image (path to image). Upload the image for lightbox navigation's close hover button.
        "CaptionHeight": 75, // Caption Height (value in pixels). Default value: 75. Set caption height.
        "CaptionTitleColor": "eeeeee", // Caption Title Color (color hex code). Default value: eeeeee. Set caption title color.
        "CaptionTextColor": "dddddd", // Caption Text Color (color hex code). Default value: dddddd. Set caption text color.
        "CaptionScrollScrubColor": "777777", // Caption Scroll Scrub Color (color hex code). Default value: 777777. Set scroll scrub color.
        "CaptionScrollBgColor": "e0e0e0", // Caption Scroll Background Color (color hex code). Default value: e0e0e0. Set scroll background color. 
        "SocialShareEnabled": "true", // Social Share Enabled (true, false). Default value: true. Enable AddThis Social Share.
        "SocialShareLightbox": "<?php echo get_template_directory_uri()?>/nggallery/assets/gui/images/SocialShareLightbox.png", // Lightbox Social Share Button Image (path to image). Upload the image for lightbox social share button.    
        "TooltipBgColor": "ffffff", // Tooltip Background Color (color hex code). Default value: ffffff. Set tooltip background color.
        "TooltipStrokeColor": "000000", // Tooltip Stroke Color (color hex code). Default value: 000000. Set tooltip stroke color.
        "TooltipTextColor": "000000", //   Tooltip Text Color (color hex code). Default value: 000000. Set tooltip text color.       
        "LabelPosition": "bottom", // Label Position (bottom, top). Default value: bottom. Set label position.
        "LabelTextColor": "000000", // Label Text Color (color hex code). Default value: 000000. Set label text color.
        "LabelTextColorHover": "ffffff" // Label Text Color Hover (color hex code). Default value: ffffff. Set label text hover color.      
    },        
    DOPNextGENWallGridGalleryContent<?php echo $gallery->ID; ?> = [    
<?php
        $i = 0;
    
        foreach ($images as $image):
            $i++;
            $filename = explode('.', $image->filename);
            
            echo '{"Image": "'.$image->imageURL.'",'.
                  '"Thumb": "'.$image->thumbURL.'",'.
                  '"CaptionTitle": \''.($image->alttext == $filename[0] || $image->alttext == ' ' ? '':preg_replace('`\'`', "&#39;", $image->alttext)).'\','.
                  '"CaptionText": \''.($image->description == ' ' ? '':preg_replace('`\'`', "&#39;", preg_replace('`[\r\n]`', "<br />", html_entity_decode(stripslashes($image->description))))).'\','.
                  '"Media": \''.preg_replace('`[\r\n]`', "", stripslashes($image->ngg_custom_fields['Media'])).'\','.
                  '"Link": "'.stripslashes($image->ngg_custom_fields['Link']).'",'.
                  '"LinkTarget": "'.stripslashes($image->ngg_custom_fields['LinkTarget']).'"}';
                      
            if ($i != count($images)){        
                echo ',';
            }
        endforeach;
?>           
    ];
</script>
<div class="DOPNextGENWallGridGallery" id="DOPNextGENWallGridGallery<?php echo $gallery->ID; ?>">
<?php
        foreach ($images as $image):
            echo '<img src="'.$image->imageURL.'" alt="'.($image->alttext == ' ' ? '':preg_replace('`\'`', "&#39;", $image->alttext)).'" title="'.($image->alttext == ' ' ? '':preg_replace('`\'`', "&#39;", $image->alttext)).'" style="display: none;" />';
        endforeach;
?>
</div>
<?php
        echo $pagination;
?>
<script type="text/JavaScript">
    jQuery(document).ready(function(){
        jQuery('#DOPNextGENWallGridGallery<?php echo $gallery->ID; ?>').DOPNextGENWallGridGallery();
    });
</script>
<?php
    }
?>


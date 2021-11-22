var popupImages = [
    "<img src='images/final_low_resized/1.png' >",
    "<img src='images/final_low_resized/2.png' >",
    "<img src='images/final_low_resized/3.png' >",
    "<img src='images/final_low_resized/4.png' >",
    "<img src='images/final_low_resized/5.png' >",
    "<img src='images/final_low_resized/6.png' >",
    "<img src='images/final_low_resized/7.png' >",
    "<img src='images/final_low_resized/8.png' >",
    "<img src='images/final_low_resized/9.png' >",
    "<img src='images/final_low_resized/10.png' >",
    "<img src='images/final_low_resized/11.png' >",
    "<img src='images/final_low_resized/12.png' >",
    "<img src='images/final_low_resized/13.png' >"
  ];
var pLIndex;
var pLEntry;
var additionalImgZero;
var additionalImgOne;
var additionalImgTwo;

var prices = ["* руб.", "* руб.", "* руб.", "* руб.", "* руб.", "* руб.", "* руб.", "* руб.",
              "* руб.", "* руб.", "* руб.", "* руб.", "* руб.",];

var indexTmp;

function popupAdditional(i, params)	{
  indexTmp = i;
  if (i <= 9) {
    pLIndex = "00" + i;
  }
  if (i >= 10 && i <= 99) {
    pLIndex = "0" + i;
  }
  var pLObj = priceList[pLIndex];
  var imgZero = 'imageSource-00';
  var imgOne = 'imageSource-01';
  var imgTwo = 'imageSource-02';
  additionalImgZero = pLObj[imgZero];
  additionalImgOne = pLObj[imgOne];
  additionalImgTwo = pLObj[imgTwo];
  if (i != 'close') {
    this.popup(i, params);
  }
  if (i == 'close') {
    this.closeAdditionalWindow();
  }
  if (i == 'description') {
    this.getDescription(params);
  }
}

this.closeAdditionalWindow = function() {
  $("#header").show();
  $(".navbar").show();
  $(".more-info-parent").hide();
  $("#products").show();
  $("footer").show();
  $(".aboutContainer").show();
  $(".contactsContainer").show();
}

this.changePicture = function(j) {
  pLEntry = priceList[pLIndex];
  var imgLink = pLEntry[j];
  $(".panel-thumbnail").html("");
  $(".panel-thumbnail").html(imgLink);
}

this.popup = function(i, params)	{
  $("#placeHolder").append("<div class='more-info-parent'> \
                              <div class='more-info'> \
                                <a id='close' href='#' onclick='popupAdditional(\"close\");'> \
                                  <img width='30px' style='float:right' src='images/icons/black-close-icon-3.png' /> \
                                </a> \
                                <a type='button' class='bwAdditional bwShrinked' id='basketwidjet' href='#' onclick=\"cart.showWinow('bcontainer', 1)\"></a> \
                                <div class='row panel-thumbnail'> \
                                  " + popupImages[i] + " \
                                </div> \
                                <div class='additional'> \
                                </div> \
                                <div class='description'> \
                                  <div class='col-sm-12'> \
                                    <h3>" + params.name + "</h3><br> \
                                    <p>" + params.composition + "</p><br> \
                                    <p>" + params.description + "</p><br> \
                                    <p>" + params.bestBefore + "</p><br> \
                                  </div> \
                                </div> \
                                <div class='price-button'> \
                                  <h3> \
                                    <button class='add-to-cart' id='wicartbutton_" + pLIndex + "' onclick=\"cart.addToCart('this', '"+pLIndex+"', priceList['"+pLIndex+"'])\"> \
                                      <span id='pricePopup'>  " + prices[i] + " </span> \
                                      <span><img src='images/icons/shopping cart icon.png' width='50px'></span> \
                                    </button> \
                                  </h3> \
                                </div> \
                                <a id='back' href='#' onclick='popupAdditional(\"close\");'> \
                                  <img width='30px' style='float:left' src='images/icons/back-button.png' /> \
                                </a> \
                              </div> \
                            </div> \
                            <script src='js/busketInit.js' type='text/javascript' ></script> \
                            <script src='js/cartAnimation.js' type='text/javascript' ></script> \
                            <script src='js/priceList.js' type='text/javascript' ></script> \
                            ");
  $("#header").hide();
  $(".navbar").hide();
  $("#products").hide();
  $("footer").hide();
  $(".aboutContainer").hide();
  $(".contactsContainer").hide();
}
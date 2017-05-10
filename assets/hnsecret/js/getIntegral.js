$(function () {

    //$('.mask').show();

    //弹窗
    $('.mask').hide();
    $('.maskBtn').click(function () {
        $('.mask').hide();
    });
    $('.btn').click(function () {
        $('.mask').hide();
        if($('.title').innerHTML=='领取成功'){
            $('.successTab').show();
        }

    });


    /*   //切换语言版本
     var languageFlag = 0;//0代表中文繁體 1代表中文简体
     var $languages = $('.language>a');
     $languages.on('click', function () {
     $(this).addClass('active').siblings().removeClass('active');
     });


     //简体语言
     $('.familiar').on('click', function () {
     languageFlag = 1;//1代表中文简体
     $('.top').html('您已成功通过会员验证，快来领取666积分吧！');
     $('.integralNum').attr('placeholder', '请输入卡片上的领取码');
     $('.getCodeBtn').html('领取666积分');
     $('.bottom').html('每个会员仅可领取一次 <br/> 2018年5月31日前扫码领取有效');
     });

     //繁体语言
     $('.complex').on('click', function () {
     languageFlag = 0;
     $('.top').html('您已成功通過會員驗證，快來領取666積分吧！');
     $('.integralNum').attr('placeholder', '請輸入卡片上的領取碼');
     $('.getCodeBtn').html('領取666積分');
     $('.bottom').html('每個會員僅可領取一次 <br/> 2018年5月31日前掃碼領取有效');
     });*/

    //按钮请求
    var flag = false;
    var changeBtnStyle = function () {
        var $btn = $('.getCodeBtn');

        if (flag) {
            // 正在请求
            if (!$btn.hasClass('active')) {
                $btn.addClass('active');
            }
        } else {
            //请求完毕
            if ($btn.hasClass('active')) {
                $btn.removeClass('active');
            }
        }
    };
    var showMask = (function () {
        // @lanType - > 语言类型  option 配置选项
        // 默认配置项
        var defaultOption = {
            // 简体
            simple: {
                titleText: '',
                contentText: '',
                btnText: '知道了'
            },
            complex: {
                //繁体
                titleText: '領取成功',
                contentText: '您已成功領取666金鵬積分，積分將在24小時內到賬，請登錄ffp.hnair.com查詢。',
                btnText: '知道了'
            },
            english: {
                //英语
                titleText: '',
                contentText: '',
                btnText: ''
            }
        };

        return function (lanType, option) {
            option = $.extend({}, defaultOption[lanType], option);
            $('.title').html(option.titleText);
            $('.con').html(option.contentText);
            $('.btn').html(option.btnText);
            $('.mask').show();
        }

    })();

    //发送请求校验
    $('.getCodeBtn').on('click', function () {
        if ($('.integralNum').val() == '') {
            alert($('.integralNum').attr('placeholder'));
        } else {
            var ajaxData = {};
            ajaxData.verCode = $('.integralNum').val();
            if (flag == false) {
                flag = true;
                changeBtnStyle();
                $.ajax({
                    url: 'getPoints',
                    type: 'post',
                    data: ajaxData,
                    dataType: 'json',
                    success: function (data) {
                        flag = false;
                        changeBtnStyle();
                        if ([0, 1, 2, 3, 4].indexOf(data.codeNum) > -1) {
                            showMask(lanType, alertMessage[data.codeNum]);
                        } else {
                            //codeNum 出现其他情况
                        }
                        $('.integralNum').val('');
                    },
                    error: function () {
                        //服务器报错
                        flag = false;
                        changeBtnStyle();
                        showMask(lanType, alertMessage[4]);
                    }
                });
            }
        }
    });
});

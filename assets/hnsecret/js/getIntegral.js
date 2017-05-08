$(function(){
    //切换语言版本
    var $languages=$('.language>a');
    $languages.on('click',function () {
        $(this).addClass('active').siblings().removeClass('active');
    });
    //简体语言
    $('.familiar').on('click',function () {
        $('.top').html('您已成功通过会员验证，快来领取666积分吧！');
        $('.integralNum').attr('placeholder','请输入书签上的领取码');
        $('.getCodeBtn').html('领取666积分');
        $('.bottom').html('每个会员仅可领取一次 <br/> 2018年5月31日前扫码领取有效');

    });

    //繁体语言
    $('.complex').on('click',function () {
        $('.top').html('您已成功通過會員驗證，快來領取666積分吧！');
        $('.integralNum').attr('placeholder','請輸入書籤上的領取碼');
        $('.getCodeBtn').html('領取666積分');
        $('.bottom').html('每個會員僅可領取一次 <br/> 2018年5月31日前掃碼領取有效');

    });

    //发送请求校验
    $('.getCodeBtn').on('click',function () {
        if($('.integralNum').val()==''){
            alert($('.integralNum').attr('placeholder'));
        }else {
            var ajaxData={};
            ajaxData.verCode=$('integralNum').val();
            $.ajax({
                url:'aaa',
                type:'post',
                data:ajaxData,
                success:function (data) {
                    if(data.codeNum==0){//codeNum==0代表信息校验成功
                        $('.mask').show();
                        $('.title').html('領取成功');
                        $('.con').html('您已成功領取666金鵬積分，積分將在24小時內到賬，請登錄ffp.hnair.com查詢。');
                        $('.btn').html('知道了')
                    }else if(data.codeNum==1){//codeNum==1代表积分已被领用
                        $('.mask').show();
                        $('.title').html('領取失敗');
                        $('.con').html('此積分領取碼已被使用，如有疑問請撥打86-898-950717諮詢。');
                        $('.btn').html('知道了')
                    }else if(data.codeNum==2){//codeNum==2代表输入的积分码错误
                        $('.mask').show();
                        $('.title').html('領取失敗');
                        $('.con').html('您輸入的領取碼有誤，請核對后重新輸入。');
                        $('.btn').html('知道了')
                    }else if(data.codeNum==3){//codeNum==3代表此用户已经参加过活动
                        $('.mask').show();
                        $('.title').html('領取失敗');
                        $('.con').html('此會員已參加過本活動，每位會員僅可領取一次，如有疑問請撥打86-898-950717諮詢。');
                        $('.btn').html('知道了')
                    }
                },
            });
        }
    })

});

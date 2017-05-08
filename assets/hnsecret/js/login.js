
$.extend({//给类上直接扩充选项卡
    tab:function(strId){
        var $box=$(strId);
        var aBtn=$box.children('input');
        var aDiv=$box.find('.content');
        aBtn.click(function(){
            $(this).addClass('on').siblings().removeClass('on');
            aDiv.eq($(this).index()).addClass('show').siblings().removeClass('show');
        })
    }
});

$(function(){
    //选项卡
    $.tab('#tab');
    //切换语言版本
    var $languages=$('.language>a');
    $languages.on('click',function () {
        $(this).addClass('active').siblings().removeClass('active');
    });

    // 验证码相关

    var $code1 = $('#code1');

    var w = Math.ceil($code1.width() + 2);
    var h = Math.ceil($code1.height() + 2);

    var verifyCode1 = new GVerify({
        id: "code1", //容器Id
        canvasId: "verifyCanvas1", //canvas的ID
        width: w, //默认canvas宽度
        height: h, //默认canvas高度
        type: "blend", //图形验证码默认类型blend:数字字母混合类型、number:纯数字、letter:纯字母
    });

    var verifyCode2 = new GVerify({
        id: "code2", //容器Id
        canvasId: "verifyCanvas2", //canvas的ID
        width: w, //默认canvas宽度
        height: h, //默认canvas高度
        type: "blend", //图形验证码默认类型blend:数字字母混合类型、number:纯数字、letter:纯字母
    });

    $('.signInBtn').on('click',function() {
        // 验证相关
        if($('.btn.on').index() === 0) {
            var $inputs=$('.no1>div>input');
            for(var i=0;i<$inputs.length;i++){
                var value=$inputs.eq(i).val();
                if(value==''){
                    alert('请输入'+$inputs.eq(i).attr('placeholder'));
                    return false;
                }
            }
            // 第一种
            if(verifyCode1.validate($('.codeInput1').val())) {
                var data={};
                data.cardid=$('.cardNum').val();
                data.lastname=$('.surname').val();
                $.ajax({
                    url:'aaa',
                    type:'post',
                    data:data,
                    success:function () {
                        if(tabNum==0){//tabNum==0代表信息校验成功
                            window.location.href='./getIntegral.html'
                        }else if(tabNum==1){//tabNum==1代表输入的卡號和姓氏匹配不上
                            $('.mask').show();
                            $('.title').html('驗證失敗');
                            $('.con').html('您輸入的卡號或姓氏有誤，請核對後重新輸入。');
                            $('.btn').html('知道了')
                        }
                    },
                });
            } else {
                alert('验证码错误')
            }
        } else {
            // 第二种
            var inputs=$('.no2>div>input');
            for(var i=0;i<inputs.length;i++){
                var value2=inputs.eq(i).val();
                if(value2==''){
                    alert('请输入'+inputs.eq(i).attr('placeholder'));
                    return false;
                }
            }
            if(verifyCode2.validate($('.codeInput2').val())) {
                var data={};
                data.cardid=$('.cardNum').val();
                data.pwd=$('.passwordNum').val();
                $.ajax({
                    url:'aaa',
                    type:'post',
                    data:data,
                    success:function () {
                        if(tabNum==0){//tabNum==0代表信息校验成功
                            window.location.href='./getIntegral.html'
                        }else if(tabNum==2){//tabNum==2代表输入的用户名和密码匹配不上
                            $('.mask').show();
                            $('.title').html('驗證失敗');
                            $('.con').html('您輸入的用戶名或密碼有誤，請核對後重新輸入。');
                            $('.btn').html('知道了')
                        }
                    },
                });
            } else {
                alert('验证码错误')
            }
        }
    });

    //弹窗
    $('.mask').hide();
    $('.maskBtn').click(function () {
        $('.mask').hide();
    });
    $('.forgetCard').click(function () {
        $('.mask').show();
        $('.title').html('溫馨提示');
        $('.con').html('完成找回卡號後，請重新掃描書籤二維碼領取獎勵。');
        $('.btn').html('找回卡號')
    });
    $('.forgetPassword').click(function () {
        $('.mask').show();
        $('.title').html('溫馨提示');
        $('.con').html('完成找回密碼后，請重新掃描書籤二維碼領取獎勵。');
        $('.btn').html('找回密碼')
    });
    $('.signUpBtn').click(function () {
        $('.mask').show();
        $('.title').html('溫馨提示');
        $('.con').html('完成註冊後，請重新掃描書籤二維碼領取獎勵。');
        $('.btn').html('立即註冊')
    });


});

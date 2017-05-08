$(function(){
    $('.getCodeBtn').on('click',function () {
        console.log(1);
        if($('.integralNum').val()==''){
            alert('請輸入領取碼')
        }else {
            var data={};
            data.verCode=$('integralNum').val();
            $.ajax({
                url:'aaa',
                type:'post',
                data:data,
                success:function () {
                    if(codeNum==0){//codeNum==0代表信息校验成功
                        $('.mask').show();
                        $('.title').html('領取成功');
                        $('.con').html('您已成功領取666金鵬積分，積分將在24小時內到賬，請登錄ffp.hnair.com查詢。');
                        $('.btn').html('知道了')
                    }else if(codeNum==1){//codeNum==1代表积分已被领用
                        $('.mask').show();
                        $('.title').html('領取失敗');
                        $('.con').html('此積分領取碼已被使用，如有疑問請撥打86-898-950717諮詢。');
                        $('.btn').html('知道了')
                    }else if(codeNum==2){//codeNum==2代表输入的积分码错误
                        $('.mask').show();
                        $('.title').html('領取失敗');
                        $('.con').html('您輸入的領取碼有誤，請核對后重新輸入。');
                        $('.btn').html('知道了')
                    }else if(codeNum==3){
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

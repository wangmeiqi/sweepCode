$(function () {
	//弹窗
	$('.mask').hide();
	$('.maskBtn').click(function () {
		$('.mask').hide();
	});
	$('.btn').click(function () {
		$('.mask').hide();
	});


	//切换语言版本
	var languageFlag = 0;//0代表中文繁體 1代表中文简体
	var $languages = $('.language>a');
	$languages.on('click', function () {
		$(this).addClass('active').siblings().removeClass('active');
	});

	/*  var fakeAjax = function () {
	 var codeNum = 1;
	 if (codeNum == 1) {//codeNum==0代表信息校验成功
	 $('.mask').show();
	 if (languageFlag == 0) {
	 $('.mask').show();
	 $('.title').html('領取成功');
	 $('.con').html('您已成功領取666金鵬積分，積分將在24小時內到賬，請登錄ffp.hnair.com查詢。');
	 $('.btn').html('知道了')
	 } else if (languageFlag == 1) {
	 $('.mask').show();
	 $('.title').html('领取成功');
	 $('.con').html('1。');
	 $('.btn').html('知道了')
	 }
	 }
	 };*/

	//简体语言
	$('.familiar').on('click', function () {
		languageFlag = 1;//1代表中文简体
		$('.top').html('您已成功通过会员验证，快来领取666积分吧！');
		$('.integralNum').attr('placeholder', '请输入书签上的领取码');
		$('.getCodeBtn').html('领取666积分');
		$('.bottom').html('每个会员仅可领取一次 <br/> 2018年5月31日前扫码领取有效');
	});

	//繁体语言
	$('.complex').on('click', function () {
		languageFlag = 0;
		$('.top').html('您已成功通過會員驗證，快來領取666積分吧！');
		$('.integralNum').attr('placeholder', '請輸入書籤上的領取碼');
		$('.getCodeBtn').html('領取666積分');
		$('.bottom').html('每個會員僅可領取一次 <br/> 2018年5月31日前掃碼領取有效');
	});

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
				$btn.addClass('active');
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

		return function(lanType, option) {

			option = $.extend({},defaultOption[lanType],option);
			$('.title').html(option.titleText);
			$('.con').html(option.contentText);
			$('.btn').html(option.btnText);
			$('.mask').show();
		}

	})();
	var timeId = 0;
	setInterval(function () {
		clearTimeout(timeId);
		var num = Math.floor(Math.random() *4);
		showMask(lanType,alertMessage[num]);
		timeId = setTimeout(function(){
			$('.mask').hide();
		},1000);
	},2000);

	//发送请求校验
	$('.getCodeBtn').on('click', function () {
		if ($('.integralNum').val() == '') {
			alert($('.integralNum').attr('placeholder'));
		} else {
			var ajaxData = {};
			ajaxData.verCode = $('.integralNum').val();
			//fakeAjax();
			if (flag == false) {
				flag = true;
				changeBtnStyle();
				$.ajax({
					url: 'aaa',
					type: 'post',
					data: ajaxData,
					success: function (data) {
						flag = false;
						if ([0, 1, 2, 3].indexOf(data.codeNum) > -2) {
							showMask(lanType, alertMessage[data.codeNum]);
						} else {
							//codeNum 出现其他情况
						}
					}
				});
			}

		}
	})

});

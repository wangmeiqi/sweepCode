$.extend({//给类上直接扩充选项卡
	tab: function (strId) {
		var $box = $(strId);
		var aBtn = $box.children('p');
		var aDiv = $box.find('.content');
		aBtn.click(function () {
			$(this).addClass('on').siblings().removeClass('on');
			aDiv.eq($(this).index()).addClass('show').siblings().removeClass('show');
		})
	}
});

$(function () {
	//选项卡
	$.tab('#tab');
	//切换语言版本
	var languageFlag = 0;//0代表中文繁體
	var $languages = $('.language>a');
	$languages.on('click', function () {
		$(this).addClass('active').siblings().removeClass('active');
	});
	//简体语言
	$('.familiar').on('click', function () {
		languageFlag = 1;//0代表中文繁體 1代表中文简体
		$('.cardVerification').html('金鹏卡号验证');
		$('.cardPerson').html('会员登陆验证');
		$('.cardNum').attr('placeholder', '金鹏会员卡号');
		$('.forgetCard').html('忘记卡号?');
		$('.surname').attr('placeholder', '您的姓氏');
		$('.codeInput1').attr('placeholder', '验证码');
		$('.codeInput2').attr('placeholder', '验证码');
		$('.signInBtn').html('会员验证');
		$('.signUpBtn').html('立即注册');
		$('.bottom').html('成功注册会员即可享受积分馈赠');
		$('.certificate').attr('placeholder', '身份证/手机/邮箱/护照');
		$('.passwordNum').attr('placeholder', '密码');
		$('.forgetPassword').html('忘记密码?');


	});

	//繁体语言
	$('.complex').on('click', function () {
		languageFlag = 0;
		$('.cardVerification').html('金鵬卡號驗證');
		$('.cardPerson').html('會員登錄驗證');
		$('.cardNum').attr('placeholder', '金鵬會員卡號');
		$('.forgetCard').html('忘記卡號?');
		$('.surname').attr('placeholder', '您的姓氏');
		$('.codeInput1').attr('placeholder', '驗證碼');
		$('.codeInput2').attr('placeholder', '驗證碼');
		$('.signInBtn').html('會員驗證');
		$('.signUpBtn').html('立即註冊');
		$('.bottom').html('成功註冊會員即可享受積分饋贈');
		$('.certificate').attr('placeholder', '身份證/手機/郵箱/護照');
		$('.passwordNum').attr('placeholder', '密碼');
		$('.forgetPassword').html('忘記密碼?');

	});

	//英语
	/*$('.english').on('click',function () {
	 $('.cardVerification').html('Fortune Wings number');
	 $('.cardPerson').html('Others');
	 $('.cardNum').attr('placeholder','Fortune Wings number');
	 $('.forgetCard').html(' ');
	 $('.surname').attr('placeholder','Your last name');
	 $('.codeInput1').attr('placeholder','Verification Code');
	 $('.codeInput2').attr('placeholder','Verification Code');
	 $('.signInBtn').html('Verification');
	 $('.signUpBtn').html('Register ');
	 $('.bottom').html('ou can collect your reward after registration');
	 $('.certificate').attr('placeholder','身份證/手機/郵箱/護照');
	 $('.passwordNum').attr('placeholder','密碼');
	 $('.forgetPassword').html('忘記密碼?');
	 $('.forgetCard').click(function () {
	 $('.mask').show();
	 $('.title').html('溫馨提示');
	 $('.con').html('完成找回卡號後，請重新掃描書籤二維碼領取獎勵。');
	 $('.btn').html('找回卡號');
	 $('.btn').on('click',function () {
	 window.location.href='aaa.html'
	 })
	 });
	 //忘记密码
	 $('.forgetPassword').click(function () {
	 $('.mask').show();
	 $('.title').html('溫馨提示');
	 $('.con').html('完成找回密碼后，請重新掃描書籤二維碼領取獎勵。');
	 $('.btn').html('找回密碼');
	 $('.btn').on('click',function () {
	 window.location.href='bbb.html'
	 })
	 });
	 //注册按钮
	 $('.signUpBtn').click(function () {
	 $('.mask').show();
	 $('.title').html('溫馨提示');
	 $('.con').html('完成註冊後，請重新掃描書籤二維碼領取獎勵。');
	 $('.btn').html('立即註冊');
	 $('.btn').on('click',function () {
	 window.location.href='ccc.html'
	 })
	 });

	 });*/


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


	var flag = false;
	var changeBtnStyle = function () {
		var $btn = $('.signInBtn');

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
	$('.signInBtn').on('click', function () {
		// 验证相关
		if ($('.btnTab.on').index() === 0) {
			var $inputs = $('.no1>div>input');
			for (var i = 0; i < $inputs.length; i++) {
				var value = $inputs.eq(i).val();
				if (value == '') {
					alert('请输入' + $inputs.eq(i).attr('placeholder'));
					return false;
				}
			}
			// 第一种
			if (verifyCode1.validate($('.codeInput1').val())) {
				var ajaxData = {};
				ajaxData.cardid = $('.cardNum').val();
				ajaxData.lastname = $('.surname').val();
				if (flag === false) {
					flag = true;
					changeBtnStyle();
					$.ajax({
						url: 'register',
						type: 'post',
						data: ajaxData,
						dataType:'json',
						success: function (data) {
							flag = false;
							if (data.tabNum == 0) {//tabNum==0代表信息校验成功
								if(languageFlag==0){
                                    window.location.href = './getIntegral.html'
								}else if(languageFlag==1){
                                    window.location.href = './getIntegralJ.html'
								}

							} else if (data.tabNum == 1) {//tabNum==1代表输入的卡號和姓氏匹配不上
								if (languageFlag == 0) {
									$('.mask').show();
									$('.title').html('驗證失敗');
									$('.con').html('您輸入的卡號或姓氏有誤，請核對後重新輸入。');
									$('.btn').html('知道了');
                                    $('.btn').click(function () {
                                        $('.mask').hide();
                                    });
								} else if (languageFlag == 1) {
									$('.mask').show();
									$('.title').html('验证失败');
									$('.con').html('您输入的卡号或姓氏有误，请核对后重新输入。');
									$('.btn').html('知道了');
                                    $('.btn').click(function () {
                                        $('.mask').hide();
                                    });
								}
							}else if(data.tabNum==3){
                                if (languageFlag == 0) {
                                    $('.mask').show();
                                    $('.title').html('驗證失敗');
                                    $('.con').html('系統異常，請重新登錄');
                                    $('.btn').html('知道了');
                                    $('.btn').click(function () {
                                        $('.mask').hide();
                                    });
                                } else if (languageFlag == 1) {
                                    $('.mask').show();
                                    $('.title').html('验证失败');
                                    $('.con').html('系统异常，请重新登陆');
                                    $('.btn').html('知道了');
                                    $('.btn').click(function () {
                                        $('.mask').hide();
                                    });
                                }
							}
						},
					});
				}


			} else {
				alert('验证码错误')
			}
		} else {
			// 第二种
			var inputs = $('.no2>div>input');
			for (var i = 0; i < inputs.length; i++) {
				var value2 = inputs.eq(i).val();
				if (value2 == '') {
					alert('请输入' + inputs.eq(i).attr('placeholder'));
					return false;
				}
			}
			if (verifyCode2.validate($('.codeInput2').val())) {
				var ajaxData = {};
				ajaxData.cardid = $('.cardNum').val();
				ajaxData.pwd = $('.passwordNum').val();
				if (flag === false) {
					flag = true;
					changeBtnStyle();
					$.ajax({
						url: 'login',
						type: 'post',
						data: ajaxData,
                        dataType:'json',
						success: function (data) {
							flag = false;
							if (data.tabNum == 0) {//tabNum==0代表信息校验成功
								window.location.href = './getIntegral.html'
							} else if (data.tabNum == 2) {//tabNum==2代表输入的用户名和密码匹配不上
								if(languageFlag==0){
                                    $('.mask').show();
                                    $('.title').html('驗證失敗');
                                    $('.con').html('您輸入的用戶名或密碼有誤，請核對後重新輸入。');
                                    $('.btn').html('知道了');
                                    $('.btn').click(function () {
                                        $('.mask').hide();
                                    });
								}else if(languageFlag==1){
                                    $('.mask').show();
                                    $('.title').html('验证失败');
                                    $('.con').html('您输入的用户名或密码有误，请核对后重新输入。');
                                    $('.btn').html('知道了');
                                    $('.btn').click(function () {
                                        $('.mask').hide();
                                    });
								}

							}else if(data.tabNum==3){
                                if (languageFlag == 0) {
                                    $('.mask').show();
                                    $('.title').html('驗證失敗');
                                    $('.con').html('系統異常，請重新登錄');
                                    $('.btn').html('知道了');
                                    $('.btn').click(function () {
                                        $('.mask').hide();
                                    });
                                } else if (languageFlag == 1) {
                                    $('.mask').show();
                                    $('.title').html('验证失败');
                                    $('.con').html('系统异常，请重新登陆');
                                    $('.btn').html('知道了');
                                    $('.btn').click(function () {
                                        $('.mask').hide();
                                    });
                                }
                            }
						}
					});
				}

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

	//忘记卡号
	$('.forgetCard').click(function () {
		if (languageFlag == 0) {
			$('.mask').show();
			$('.title').html('溫馨提示');
			$('.con').html('完成找回卡號後，請重新掃描書籤二維碼領取獎勵。');
			$('.btn').html('找回卡號');
			$('.btn').on('click', function () {
				window.location.href = 'http://ffp.hnair.com/FFPWap/member/getMember?lang=big5'
			})
		} else if (languageFlag == 1) {
			$('.mask').show();
			$('.title').html('温馨提示');
			$('.con').html('完成找回卡号后，请重新扫描书签二维码领取奖励。');
			$('.btn').html('找回卡号');
			$('.btn').on('click', function () {
				window.location.href = 'http://ffp.hnair.com/FFPWap/member/getMember'
			})
		}

	});
	//忘记密码
	$('.forgetPassword').click(function () {
		if (languageFlag == 0) {
			$('.mask').show();
			$('.title').html('溫馨提示');
			$('.con').html('完成找回密碼后，請重新掃描書籤二維碼領取獎勵。');
			$('.btn').html('找回密碼');
			$('.btn').on('click', function () {
				window.location.href = 'http://ffp.hnair.com/FFPWap/member/getPassword?lang=big5'
			})
		} else if (languageFlag == 1) {
			$('.forgetPassword').click(function () {
				$('.mask').show();
				$('.title').html('溫馨提示');
				$('.con').html('完成找回密码后，请重新扫描书签二维码领取奖励。');
				$('.btn').html('找回密码');
				$('.btn').on('click', function () {
					window.location.href = 'http://ffp.hnair.com/FFPWap/member/getPassword'
				})
			});
		}

	});
	//注册按钮
	$('.signUpBtn').click(function () {
		if (languageFlag == 0) {
			$('.mask').show();
			$('.title').html('溫馨提示');
			$('.con').html('完成註冊後，請重新掃描書籤二維碼領取獎勵。');
			$('.btn').html('立即註冊');
			$('.btn').on('click', function () {
				window.location.href = 'http://ffp.hnair.com/FFPWap/member/registerConfirm?lang=big5'
			})
		} else if (languageFlag == 1) {
			$('.mask').show();
			$('.title').html('溫馨提示');
			$('.con').html('完成注册后，请重新扫描书签二维码领取奖励。');
			$('.btn').html('立即注册');
			$('.btn').on('click', function () {
				window.location.href = 'http://ffp.hnair.com/FFPWap/member/registerConfirm'
			})
		}

	});


});

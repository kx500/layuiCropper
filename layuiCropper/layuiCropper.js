 
layui.define(function(exports){ //提示：模块也可以依赖其它模块，如：layui.define('layer', callback);
    window.jQuery = layui.$;

    layui.$.getScript("/static/layui/examples/layuiCropper/cropper.min.js").done(function() {
		var obj = {
			options: {},
			// 裁剪组件初始化，在界面中加入默认隐藏的裁剪界面
			render: function(e){
				var self = this;
				obj.options = e;
				
				var cropperHtml = '<link rel="stylesheet" href="/static/layui/examples/layuiCropper/cropper.min.css">\n'+
				    '<link rel="stylesheet" href="/static/layui/examples/layuiCropper/cropper.css">'+
					'<div id="showEdit">'+
					'  <div class="msgtip">图片剪切</div>'+
					'  <div class="bg"><img id="cropImage" src=""></div>'+
					'  <div class="control">'+
					'	 <dl class="ControlBtn p10 center">'+
					' 	   <a cropper-event="reset" href="javascript:;">重置</a>'+
					'      <a cropper-event="rotate" data-option="-15" href="javascript:;">左旋</a>'+
					'	   <a cropper-event="rotate" data-option="15" href="javascript:;">右旋</a>'+
					'	   <a cropper-event="save" href="javascript:;">确认</a>' +
					'	 </dl>'+
					'  </div>'+
					'</div>';
				layui.$('body').append(cropperHtml);
				
				var showEdit = layui.$("#showEdit"),
					image = layui.$("#cropImage"),
				    elemFile = layui.$(['<input class="layui-upload-file" type="file" accept="image/*" name="file" >'].join(""));
					
				obj.isFile() ? elemFile = layui.$(e.elem) : layui.$(e.elem).after(elemFile),
				
				layui.$(obj.options.elem).on("click", function(){
					obj.isFile() || elemFile[0].click();
				});
				
				layui.$(".ControlBtn a").on('click',function (){
				    var event = layui.$(this).attr("cropper-event");
					if(event == 'reset')
					{
						image.cropper('reset');
					}else if(event == 'rotate')
					{
						var option = layui.$(this).data('option');
						image.cropper('rotate', option);
					}else if(event == 'save')
					{
						image.crossOrigin='anonymous';//解决跨域图片问题
						image.cropper("getCroppedCanvas",{
							width: obj.options.minCropBoxWidth,
							height: obj.options.minCropBoxHeight
						}).toBlob(function(blob){
							layui.$("#showEdit").fadeOut();
						    return obj.options.done({ blob: blob, filename: self.file.name });
						});
					}
				});
		
				//文件选择
				layui.$(elemFile).change(function () {
					layui.layer.load();
					var r = new FileReader();
					self.file = this.files[0];
	
					r.readAsDataURL(self.file);
					r.onload = function (e) {
						image.cropper('destroy').attr('src', this.result).cropper(obj.options).cropper('setData', obj.options);
						
						layui.layer.closeAll('loading');
						showEdit.fadeIn();
					};
				});
				
			},
			
			isFile: function() {
				var e = layui.$(obj.options.elem)[0];
				if (e) return "input" === e.tagName.toLocaleLowerCase() && "file" === e.type
			},
		};

		exports('layuiCropper', obj);
		
    }).fail(function() {
        layui.hint().error('加载cropper失败')
    });
});

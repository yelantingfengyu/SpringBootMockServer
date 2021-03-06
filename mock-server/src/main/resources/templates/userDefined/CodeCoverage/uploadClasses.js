/**
 * 
 */
layui.config({ // version : '1535898708509' // 为了更新 js 缓存，可忽略
});

layui.use([ 'laypage', 'layer', 'table', 'element', 'form', 'upload' ],
		function() {
			var form = layui.form;
			var layer = (parent.layer === undefined ? layui.layer : top.layer);
			var $ = layui.jquery;
			var laydate = layui.laydate;
			var laytpl = layui.laytpl;
			var table = layui.table;
			var laypage = layui.laypage;
			var upload = layui.upload;
			var element = layui.element;
			// 元素操作

			var widthPercent = "70%", heightPercent = "90%";

			/**
			 * 获取页面的id
			 * 
			 */
			function getParentId() {
				let searchContent = window.location.search;
				let targetId = getValueOfKeyFromWindowLocationSearch("id",
						searchContent);
				return targetId;
			}

			/**
			 * 获取详情
			 */

			function getCodeCoverageDetail() {
				let targetId = getParentId();
				let detail = getCurrentTableData(targetId);
				
				console.log(detail);
				return detail.data;
			}

			var detail = getCodeCoverageDetail();
			proccessObject(detail);

			let uploadConfifg = {
				elem : "#uploadClasses",
				url : "/codeCoverage/uploadClasses",
				auto : false,
				type : "post",
//				dataType : 'json',
				field : "uploadClasses",
				contentType : "application/json",
				// 允许上传类型
				accept:"file",
				exts : "zip",
				drag : true,
				size : 1048576,
				bindAction : "#startToUpload",
				data : detail,
				done : function(res, index, upload) {
					// 上传之后的回调
					if (res.success === "true" || res.success === true) {
						layer.msg("上传成功！");

						/**
						 * 上传成功关闭页面
						 */
						setTimeout(function() {
							console.log("关闭页面");
							top.layer.close(index);
							layer.closeAll("iframe");
							// 刷新父页面
							parent.location.reload();
						}, 500);

						return;
					}

					if ((res.success === "false" || res.success === false)) {
						if (res.msg !== "") {
							layer.msg("上传文件失败:" + res.msg);
						} else {
							layer.msg("上传文件失败");
						}

						return;
					}
				},
				error : function(res) {
					layer.msg("上传文件失败");
				}
			};
			upload.render(uploadConfifg);
		});

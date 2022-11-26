			var REFERRER_BLACKLIST = ['https://www.qvocd.cc/', 'https://funletu.com/'];
			        if (REFERRER_BLACKLIST.includes(document.referrer)) {
			            alert("禁止从该域名访问本站，该域名存在收费资源分享或强制性公众号引流，却没给我分钱\n你赚钱了，我没赚到钱，那我凭什么给你免费用？\n如果你是用户，你可以直接在新标签页地址栏输入本站域名https://ctfile.qinlili.bid访问\n如果你是站长想解除黑名单，给我打钱就行，你赚钱了我没赚到，那我在自己的地盘上恶心下你是必然的\n\n即将传送到琴梨梨小站首页...");
			            document.location.href = "https://qinlili.bid";
			        };
			        const getInfo = async () => {
			            document.getElementById("filename").innerText = "";
			            document.getElementById("filesize").innerText = "";
			            document.getElementById("filetime").innerText = "";
			            document.getElementById("dlURL").innerText = ""
			            document.getElementById("dlbtn").style.display = "none";
			            password = document.getElementById("passcode").value ? document.getElementById("passcode").value : "547873715";
			            let fileInfo = await ctfile.getByLink(document.getElementById("link").value, password);
			            console.log(fileInfo);
			            if (fileInfo.success) {
			                document.getElementById("filename").innerText = "文件名称:" + fileInfo.name;
			                document.getElementById("filesize").innerText = "文件大小:" + fileInfo.size;
			                document.getElementById("filetime").innerText = "文件时间:" + fileInfo.time;
			                document.getElementById("dlURL").innerText = "下载地址:";
				document.getElementById("temp").innerText = fileInfo.link;
			                document.getElementById("dlbtn").style.display = "block";
				
			                const record = {
			                    link: document.getElementById("link").value,
			                    password,
			                    queryTime: new Date().toLocaleString(),
			                    name: fileInfo.name,
			                    size: fileInfo.size,
			                    time: fileInfo.time,
			                }
			                const store = localStorage.getItem("store")
			                let records = JSON.parse(store);
			
			                if (store && Array.isArray(records)) {
			                    records = records.filter(r => r.link !== record.link)
			                    records.push(record);
			                    localStorage.setItem("store", JSON.stringify(records));
			                } else {
			                    localStorage.setItem("store", JSON.stringify([record]))
			                }
			            } else {
			                document.getElementById("filename").innerText = "出错了，错误原因是:" + fileInfo.errormsg;
			            }
			        }
			            function dlFile(){
				        var val = document.getElementById('temp');
				        window.getSelection().selectAllChildren(val);
				        document.execCommand ("Copy");
					mdui.snackbar({
		  				message: '复制成功',
						position: 'right-top',
						});
				    }
			        const readClipboard = async () => {
			            const log = console.log.bind(console)
			            const text = await navigator.clipboard.readText().catch(err => {
							mdui.snackbar({
								message: '读取剪贴板失败了喵！你是否拒绝了剪贴板权限？',position: 'right-top',
							});
			            });
			            if (text) {
			                const urlPattern = /(https:\/\/)?[a-z0-9]+\.ctfile\.com\/[a-z]\/([\da-z]+-[a-z\d]+-[a-z\d]+)/;
			                const pwPattern = /\d{4}/
			                const $link = document.querySelector("#link")
			                const $passcode = document.querySelector("#passcode")
			
			                try {
			                    const link = text.match(urlPattern);
			                    $link.focus()
			                    $link.value = link[0];
			                    const rawPassword = text.split("密码")[1] || text.split("密碼")[1];
			                    const password = rawPassword.match(pwPattern);
			                    $passcode.focus()
			                    $passcode.value = password[0];
			                    await getInfo()
			                } catch (e) {
			                    mdui.alert('期望的文本形式类似于“https://url76.ctfile.com/f/20044976-553638227-3a47df 密码4718”，请尝试重新复制或者手动填入', '无法从剪贴板读取链接和密码');
			                }
			            }
			        }

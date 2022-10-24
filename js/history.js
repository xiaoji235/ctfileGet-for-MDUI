			const setBlank = () => {
			            document.querySelector("#records").innerHTML =
			                `<h4 class="title nodirectory" style="text-align:center;">暂无记录</h4>`
			        }
			        const clearAllConfirm = () => {
			            localStorage.removeItem("store")
			            setBlank()
			        }
			        const writeClipboard = async (element) => {
			            const link = element.parentElement.dataset.link;
			            const password = element.parentElement.dataset.pw;
			            await navigator.clipboard.writeText(`${link}密码: ${password}`);
			            element.querySelector('.copy').innerText = '已复制';
			        }
			        const store = localStorage.getItem("store")
			        const records = JSON.parse(store)
			        const $records = document.querySelector("#records")
			        if (store && Array.isArray(records) && records.length > 0) {
			            records.forEach(r => {
			                $records.insertAdjacentHTML("beforeend",
			                    `<div class="mdui-table">
								<div class="history-box" data-link="${r.link}" data-pw="${r.password}">
			                        <h3 class="title">
			                            <span>${r.name}</span>
			                            <span class="file-size">${r.size}</span>
			                        </h3>
			                        <div class="title history-font">原始链接: ${r.link}</div>
			                        <div class="title history-font">密码: ${r.password}</div>
			                        <div class="title history-font">发布时间: ${r.time}</div>
			                        <div class="title history-font">查询时间: ${r.queryTime}</div>
			                        <button onclick="writeClipboard(this)" class="mdui-btn mdui-ripple">
			                            <span class="copy">复制</span>
			                        </button>
			                    </div></div><br>`)
			            })
			        } else {
			            setBlank()
			        }

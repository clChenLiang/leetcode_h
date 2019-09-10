class AutocompleteController {
    /**
     * 每次用户输入任意值，都会从 payload$ 流中获得
     * 比如，用户依次输入 a, b, c
     * 那么 payload$ 流会获得三个值："a", "ab", "abc"
     */
    payload$: Subject<string>;
  
    subscription: Subscription;
  
    constructor() {
      this.subscription = this.getAutoSearch().subscribe();
    }
  
    // 更新 Input 框中的搜索词
    setSearchStr: (str: string) => void;
    // 更新搜索状态
    setLoading: (isLoading: boolean) => void;
    // 显示或隐藏警告信息
    toggleWarning: (isShown?: boolean) => void;
    // 发送请求，获取搜索结果
    searchQuery: (str: string) => Observable<User[]>;
    // 更新搜索结果列表
    setSearchResults: (users: User[]) => void;
  
    // 你要实现的方法
    getAutoSearch() {
      // 订阅 payload$, 并延时（不确定对错）
      const search$ = from(this.payload$).debounceTime(500)

      // 请求操作
      search$.subscribe(function(val) {
        // 加载状态
        this.setLoading(true)

        this.searchQuery(val)
          .subscribe({
            next: function(res: User[]) {
              this.setSearchResults(res)
            },
            error: (err) => {
              // 
              this.setSearchStr('')
              this.toggleWarning(true)
            },
            complete: () => {
              // 关闭加载状态
              this.setLoading(true)
            }
          })
      })

      // 字数限制
      this.payload$.subscribe({
        next: (val) => {
          // 取消
          if(val.length > 30) {
            search$.complete()
            this.toggleWarning(true)
          } else {
            this.toggleWarning(true)
          }
        }
      })
  
      return search$;
    }
  }
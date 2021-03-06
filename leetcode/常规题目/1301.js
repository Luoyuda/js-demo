/*
 * @Author: xiaohuolong
 * @Date: 2021-05-20 09:36:37
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2021-05-20 11:01:48
 * @FilePath: /js-demo/leetcode/常规题目/1301.js
 */
/*
1301. 最大得分的路径数目
    给你一个正方形字符数组 board ，你从数组最右下方的字符 'S' 出发。
    你的目标是到达数组最左上角的字符 'E' ，数组剩余的部分为数字字符 1, 2, ..., 9 或者障碍 'X'。在每一步移动中，你可以向上、向左或者左上方移动，可以移动的前提是到达的格子没有障碍。
    一条路径的 「得分」 定义为：路径上所有数字的和。
    请你返回一个列表，包含两个整数：第一个整数是 「得分」 的最大值，第二个整数是得到最大得分的方案数，请把结果对 10^9 + 7 取余。
    如果没有任何路径可以到达终点，请返回 [0, 0] 。
示例 1：
    输入：board = ["E23","2X2","12S"]
    输出：[7,1]
示例 2：
    输入：board = ["E12","1X1","21S"]
    输出：[4,2]
示例 3：
    输入：board = ["E11","XXX","11S"]
    输出：[0,0]
提示：
    2 <= board.length == board[i].length <= 100
 */
var mod = 1e9 + 7
/**
 * @param {string[]} board
 * @return {number[]}
 */
var pathsWithMaxScore = function(board) {
    let max = 0
    let count = 0
    let m = board.length
    let n = board[0].length
    let dx = [0, -1, -1]
    let dy = [-1, 0, -1]
    let dfs = (x, y, sum, res) => {
        if(board[x][y] == 'E'){
            sum %= mod
            // 走到终点
            if(sum > max){
                count = 1
                max = sum
            }else if(sum == max){
                count++
            }
            return
        }
        sum += res
        for(let i = 0; i < 3; i++){
            let a = x + dx[i]
            let b = y + dy[i]
            if(a >= 0 && b >= 0 && a < m && b < n && board[a][b] != 'S'){
                let temp = board[a][b]
                board[a][b] = 'S'
                dfs(a, b, sum, Number(board[a][b]))
                board[a][b] = temp
            }
        }
    }
    dfs(m - 1, n - 1, 0, 0)

    return [max, count]
};
/**
 * @param {string[]} board
 * @return {number[]}
 */
var pathsWithMaxScore = function(board) {
    let n = board.length
    let dp = new Array(n).fill(0).map(() => new Array(n).fill(0).map(() => {
        let l = new Array(2)
        // 分数
        l[0] = -1
        // 方案数
        l[1] = 0
        return l
    }))
    dp[n - 1][n - 1] = [0, 1]
    let update = (x, y, u, v) => {
        if(u >= n || v >= n || dp[u][v][0] == -1) return
        if(dp[u][v][0] > dp[x][y][0]){
            dp[x][y][0] = dp[u][v][0]
            dp[x][y][1] = dp[u][v][1]
        }else if(dp[u][v][0] == dp[x][y][0]){
            dp[x][y][1] += dp[u][v][1]
            dp[x][y][1] %= mod
        }
    }
    for (let i = n - 1; i >= 0; i--){
        for (let j = n - 1; j >= 0; j--){
            if(i == n - 1 && j == n - 1) continue
            if(board[i][j] == 'X') continue
            // 三个方向更新
            update(i, j, i + 1, j)
            update(i, j, i, j + 1)
            update(i, j, i + 1, j + 1)
            if(dp[i][j][0] != -1){
                dp[i][j][0] += (board[i][j] == 'E' ? 0 : board[i][j] - '0')
            }
        }
    }
    return dp[0][0][0] == -1 ? [0, 0] : dp[0][0]
};
console.log(pathsWithMaxScore(["E23","2X2","12S"]))
// console.log(pathsWithMaxScore(["E12","1X1","21S"]))
// console.log(pathsWithMaxScore(["E4789338X943596124X2676X552X587877X456943458X29735","611684759486631913932337237231351921X2152919376427","4499519117827344997451XX34X46693XX7181343557483669","414951X685152X89829782685X4912581351X3216914721551","X387271851925X3629265X99195X5897581179XX369637813X","1X8X2682518937289551X98X7983XX34993116413343558825","X92X12119593186X675113X682143777XX8981619298251984","X671798198463X5314971262X9392393XXX544537813812728","81856146535454X3678775784456289257XX8221X2488XXX68","77X3592XX94844399282X2X6336122XX7X18244862821X26XX","28885X948512X3585X27824186222X73X9X56441X9X4689517","344X495X682875968X82X9877379XX386748175X6293X44159","1924352186149295919715X27X555626X17798524189528625","3435681879X49727366745492X648X5952772978787143263X","412933788234154913356X2X9X144818X21XX5629259785133","489644765X456XX44XX2X5387637879X662941398337817381","7617826679176XX173173537173164967296764519X3427693","7X69X5466277665871135253486758156766536X5436X16728","318152574426X696X18X833396113X31862234511611X89691","X147492241256344555237X94772X9X5136226469551942X29","X29846X49419853778154XX636X35XX5232391787617416258","8885851X996538X163323347235993741926591X72X1761X14","226X8136988863232963682217521777419144333838517835","3197757518X241117949451X423XX55861XX6161938551X752","49X149355329X617X51X21965452X962X42762X25968X73754","X1176483834957794897816132X5X942366794665183797399","48294674492176X1X663644X58X17729X4482638X92X482422","51X16X157889846864X1436338776687677X44895154219626","782XX82XX432848434721692X55564975938X2649681569663","26792517214X8863X9896XX64619817916123168945761X526","X7XX319393797X184679X421943743279X1486126364341595","11425763X68563511X2496983325426X151456X5X459542989","89872654932254X5525587692326476X65562X59X635129314","6X944371656471737X9673645X4145X821X942995885X86522","64XX328X8243XX3445X6412955X87X42355234X73223243421","944391299X158X962X9X259552884441434XX9349X5XX79855","98422711429356771336494176X56X2584376X2354X72X5416","7135X7X9X3X699929714X61664916968X1896X5X1985386642","22969X77414X2154167176388X3313X918X1558161XX413862","4X141958614412616921588565488847635X837996835937X6","X416X64649X955369739187781488XX77129X6966899351X74","9X2349175X345X7469265842X591X4748167996963X63X7211","3117349374592412365636726147X52469X8921X1888159627","254513X73629359514989286822X7X89391797X357546X9145","8882877128738295914941X56995X243888XX595873XX99217","X947591X382X19613453263544415821689719794546655278","51X4565271954965486X492693X731844471486X149X7166X5","731X1816268181645946X2123376981X13X834338226X28X36","6X72X3599546159X378191718821X746789239488712584143","5982153336X61729X66339596838X77751396645929982913S"]))


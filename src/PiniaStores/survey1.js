export default [
    {
        status: {
            intro: true,
            survey: false,
            end: false,
            toSurvey() {
                this.intro = false;
                this.end = false;
                this.survey = true;
            },
            toEnd() {
                this.end = true;
                this.survey = false;
            }
        },
        intro: {
            title: "威廉斯创造力倾向表A",
            intro_title: "问卷介绍：",
            intro_content:
                "威廉斯创造力倾向表通过测验个人的一些性格特点包括冒险性、好奇性、想象力和挑战性，来测量个人的创造性倾向。这是一份帮助你了解自己创造力的练习。在下列的句子中，共有三种情形，“完全符合”、“部分符合”、“完全不符合”，选择最符合你自身情况的选项。切记，凭你自己的真实的感觉作答，选择最符合你自身情况的选项。",
            warn_title: "注意：",
            warn_content:
                "每一题都要做，不要花太多的时间去想。所有的题目都没有“正确答案”，凭你读每一句子后的第一印象作答。 虽然没有时间限制，但应尽可能地争取以较快的速度完成，愈快愈好。",
            button: "开始答题",
        },
        quesList: [
            {
                ques: "在学校里，我喜欢试着对事情或问题作猜测，即使不一定都猜对也无所谓。",
                value: 0,
                id: 1,
                titleBorder: 0,
                progressPartbcg: '#ccc',
                // series为该题目的级数
                series: 5,
                font: ['完全不符合', '不太符合', '部分符合', '比较符合', '完全符合']
            },
            {
                ques: "我喜欢仔细观察我没有看过的东西，以了解详细的情形。",
                value: 0,
                id: 2,
                titleBorder: 0,
                progressPartbcg: '#ccc',
                // series为该题目的级数
                series: 5,
                font: ['完全不符合', '不太符合', '部分符合', '比较符合', '完全符合']
            },
            {
                ques: "我喜欢听变化多端和富有想象力的故事。",
                value: 0,
                id: 3,
                titleBorder: 0,
                progressPartbcg: '#ccc',
                // series为该题目的级数
                series: 5,
                font: ['完全不符合', '不太符合', '部分符合', '比较符合', '完全符合']

            },
            {
                ques: "画图时我喜欢临摹别人的作品。",
                value: 0,
                id: 4,
                titleBorder: 0,
                progressPartbcg: '#ccc',
                // series为该题目的级数
                series: 5,
                font: ['完全不符合', '不太符合', '部分符合', '比较符合', '完全符合']

            },
            {
                ques: "我喜欢利用旧报纸、旧日历及旧罐头等废物来做成各种好玩的东西。",
                value: 0,
                id: 5,
                titleBorder: 0,
                progressPartbcg: '#ccc',
                // series为该题目的级数
                series: 5,
                font: ['完全不符合', '不太符合', '部分符合', '比较符合', '完全符合']

            },
            {
                ques: "我喜欢幻想一些我想知道或想做的事。",
                value: 0,
                id: 6,
                titleBorder: 0,
                progressPartbcg: '#ccc',
                series: 5,
                font: ['完全不符合', '不太符合', '部分符合', '比较符合', '完全符合']

            },
            {
                ques: "如果事情不能一次完成，我会继续尝试，直到成功为止。",
                value: 0,
                id: 7,
                titleBorder: 0,
                progressPartbcg: '#ccc',
                series: 5,
                font: ['完全不符合', '不太符合', '部分符合', '比较符合', '完全符合']

            },
            {
                ques: "做功课时我喜欢参考各种不同的资料，以便得到多方面的了解。",
                value: 0,
                id: 8,
                titleBorder: 0,
                progressPartbcg: '#ccc',
                // series为该题目的级数
                series: 5,
                font: ['完全不符合', '不太符合', '部分符合', '比较符合', '完全符合']

            },
            {
                ques: "我喜欢用相同的方法做事情，不喜欢去找其它新的方法。",
                value: 0,
                id: 9,
                titleBorder: 0,
                progressPartbcg: '#ccc',
                // series为该题目的级数
                series: 5,
                font: ['完全不符合', '不太符合', '部分符合', '比较符合', '完全符合']

            },
            {
                ques: "我喜欢探究事情的真假。",
                value: 0,
                id: 10,
                titleBorder: 0,
                progressPartbcg: '#ccc',
                // series为该题目的级数
                series: 5,
                font: ['完全不符合', '不太符合', '部分符合', '比较符合', '完全符合']

            },
            {
                ques: "我喜欢做许多新鲜的事。",
                value: 0,
                id: 11,
                titleBorder: 0,
                progressPartbcg: '#ccc',
                // series为该题目的级数
                series: 5,
                font: ['完全不符合', '不太符合', '部分符合', '比较符合', '完全符合']

            },
            {
                ques: "我不喜欢交新朋友。",
                value: 0,
                id: 12,
                titleBorder: 0,
                progressPartbcg: '#ccc',
                // series为该题目的级数
                series: 5,
                font: ['完全不符合', '不太符合', '部分符合', '比较符合', '完全符合']

            },
            {
                ques: "我喜欢想一些不会在我身上发生的事情。",
                value: 0,
                id: 13,
                titleBorder: 0,
                progressPartbcg: '#ccc',
                series: 5,
                font: ['完全不符合', '不太符合', '部分符合', '比较符合', '完全符合']

            },
            {
                ques: "我喜欢想象有一天能成为艺术家、音乐家或诗人。",
                value: 0,
                id: 14,
                titleBorder: 0,
                progressPartbcg: '#ccc',
                // series为该题目的级数
                series: 5,
                font: ['完全不符合', '不太符合', '部分符合', '比较符合', '完全符合']

            },
            {
                ques: "我会因为一些令人兴奋的念头而忘记了其它的事。",
                value: 0,
                id: 15,
                titleBorder: 0,
                progressPartbcg: '#ccc',
                // series为该题目的级数
                series: 5,
                font: ['完全不符合', '不太符合', '部分符合', '比较符合', '完全符合']

            },
            {
                ques: "我宁愿生活在太空站，也不喜欢住在地球上。",
                value: 0,
                id: 16,
                titleBorder: 0,
                progressPartbcg: '#ccc',
                // series为该题目的级数
                series: 5,
                font: ['完全不符合', '不太符合', '部分符合', '比较符合', '完全符合']

            },
            {
                ques: "我认为所有的问题都有固定的答案。",
                value: 0,
                id: 17,
                titleBorder: 0,
                progressPartbcg: '#ccc',
                // series为该题目的级数
                series: 5,
                font: ['完全不符合', '不太符合', '部分符合', '比较符合', '完全符合']

            },
            {
                ques: "我喜欢与众不同的事情。",
                value: 0,
                id: 18,
                titleBorder: 0,
                progressPartbcg: '#ccc',
                // series为该题目的级数
                series: 5,
                font: ['完全不符合', '不太符合', '部分符合', '比较符合', '完全符合']

            },
            {
                ques: "我常想要知道别人正在想什么。",
                value: 0,
                id: 19,
                titleBorder: 0,
                progressPartbcg: '#ccc',
                // series为该题目的级数
                series: 5,
                font: ['完全不符合', '不太符合', '部分符合', '比较符合', '完全符合']

            },
            {
                ques: "我喜欢故事或电视节目所描写的事。",
                value: 0,
                id: 20,
                titleBorder: 0,
                progressPartbcg: '#ccc',
                // series为该题目的级数
                series: 5,
                font: ['完全不符合', '不太符合', '部分符合', '比较符合', '完全符合']

            },
            {
                ques: "我喜欢和朋友一起，和他们分享我的想法。",
                value: 0,
                id: 21,
                titleBorder: 0,
                progressPartbcg: '#ccc',
                // series为该题目的级数
                series: 5,
                font: ['完全不符合', '不太符合', '部分符合', '比较符合', '完全符合']

            },
            {
                ques: "如果一本故事书的最后一页被撕掉了，我就自己编造一个故事，把结局补上去。",
                value: 0,
                id: 22,
                titleBorder: 0,
                progressPartbcg: '#ccc',
                // series为该题目的级数
                series: 5,
                font: ['完全不符合', '不太符合', '部分符合', '比较符合', '完全符合']

            },
            {
                ques: "我长大后，想做一些别人从没想过的事情。",
                value: 0,
                id: 23,
                titleBorder: 0,
                progressPartbcg: '#ccc',
                // series为该题目的级数
                series: 5,
                font: ['完全不符合', '不太符合', '部分符合', '比较符合', '完全符合']

            },
            {
                ques: "尝试新的游戏和活动，是一件有趣的事。",
                value: 0,
                id: 24,
                titleBorder: 0,
                progressPartbcg: '#ccc',
                // series为该题目的级数
                series: 5,
                font: ['完全不符合', '不太符合', '部分符合', '比较符合', '完全符合']

            },
            {
                ques: "我不喜欢太多的规则限制。",
                value: 0,
                id: 25,
                titleBorder: 0,
                progressPartbcg: '#ccc',
                // series为该题目的级数
                series: 5,
                font: ['完全不符合', '不太符合', '部分符合', '比较符合', '完全符合']

            },
            {
                ques: "我喜欢解决问题，即使没有正确的答案也没关系。",
                value: 0,
                id: 26,
                titleBorder: 0,
                progressPartbcg: '#ccc',
                // series为该题目的级数
                series: 5,
                font: ['完全不符合', '不太符合', '部分符合', '比较符合', '完全符合']

            },
            {
                ques: "有许多事情我都很想亲自尝试。",
                value: 0,
                id: 27,
                titleBorder: 0,
                progressPartbcg: '#ccc',
                // series为该题目的级数
                series: 5,
                font: ['完全不符合', '不太符合', '部分符合', '比较符合', '完全符合']

            },
            {
                ques: "我喜欢唱没有人知道的新歌。",
                value: 0,
                id: 28,
                titleBorder: 0,
                progressPartbcg: '#ccc',
                // series为该题目的级数
                series: 5,
                font: ['完全不符合', '不太符合', '部分符合', '比较符合', '完全符合']

            },
            {
                ques: "我不喜欢在班上同学面前发表意见。",
                value: 0,
                id: 29,
                titleBorder: 0,
                progressPartbcg: '#ccc',
                // series为该题目的级数
                series: 5,
                font: ['完全不符合', '不太符合', '部分符合', '比较符合', '完全符合']

            },
            {
                ques: "当我读小说或看电影时，我喜欢把自己想成故事中的人物。",
                value: 0,
                id: 30,
                titleBorder: 0,
                progressPartbcg: '#ccc',
                // series为该题目的级数
                series: 5,
                font: ['完全不符合', '不太符合', '部分符合', '比较符合', '完全符合']

            },
            {
                ques: "我喜欢幻想200年前人类生活的情形。",
                value: 0,
                id: 31,
                titleBorder: 0,
                progressPartbcg: '#ccc',
                // series为该题目的级数
                series: 5,
                font: ['完全不符合', '不太符合', '部分符合', '比较符合', '完全符合']

            },
            {
                ques: "我喜欢自己编一首新歌。",
                value: 0,
                id: 32,
                titleBorder: 0,
                progressPartbcg: '#ccc',
                // series为该题目的级数
                series: 5,
                font: ['完全不符合', '不太符合', '部分符合', '比较符合', '完全符合']

            },
            {
                ques: "我喜欢翻箱倒柜，看看有些什么东西在里面。",
                value: 0,
                id: 33,
                titleBorder: 0,
                progressPartbcg: '#ccc',
                // series为该题目的级数
                series: 5,
                font: ['完全不符合', '不太符合', '部分符合', '比较符合', '完全符合']

            },
            {
                ques: "画图时，我很喜欢改变各种东西的颜色和形状。",
                value: 0,
                id: 34,
                titleBorder: 0,
                progressPartbcg: '#ccc',
                // series为该题目的级数
                series: 5,
                font: ['完全不符合', '不太符合', '部分符合', '比较符合', '完全符合']

            },
            {
                ques: "我不敢确定我对事情的看法都是对的。",
                value: 0,
                id: 35,
                titleBorder: 0,
                progressPartbcg: '#ccc',
                // series为该题目的级数
                series: 5,
                font: ['完全不符合', '不太符合', '部分符合', '比较符合', '完全符合']

            },
            {
                ques: "对于一件事情先猜猜看，然后再看是不是猜对了，这种方法很有趣。",
                value: 0,
                id: 36,
                titleBorder: 0,
                progressPartbcg: '#ccc',
                // series为该题目的级数
                series: 5,
                font: ['完全不符合', '不太符合', '部分符合', '比较符合', '完全符合']

            },
            {
                ques: "玩猜谜之类的游戏很有趣，因为我想要知道结果如何。",
                value: 0,
                id: 37,
                titleBorder: 0,
                progressPartbcg: '#ccc',
                // series为该题目的级数
                series: 5,
                font: ['完全不符合', '不太符合', '部分符合', '比较符合', '完全符合']

            },
            {
                ques: "我对机器有兴趣，也很想知道它里面是什么样子，以及它是怎样转动的。",
                value: 0,
                id: 38,
                titleBorder: 0,
                progressPartbcg: '#ccc',
                // series为该题目的级数
                series: 5,
                font: ['完全不符合', '不太符合', '部分符合', '比较符合', '完全符合']

            },
            {
                ques: "我喜欢可以拆开来的玩具。",
                value: 0,
                id: 39,
                titleBorder: 0,
                progressPartbcg: '#ccc',
                // series为该题目的级数
                series: 5,
                font: ['完全不符合', '不太符合', '部分符合', '比较符合', '完全符合']

            },
            {
                ques: "我喜欢想一些新点子，即使用不着也无所谓。",
                value: 0,
                id: 40,
                titleBorder: 0,
                progressPartbcg: '#ccc',
                // series为该题目的级数
                series: 5,
                font: ['完全不符合', '不太符合', '部分符合', '比较符合', '完全符合']

            },
            {
                ques: "一篇好的文章应该包含许多不同的意见或观点。",
                value: 0,
                id: 41,
                titleBorder: 0,
                progressPartbcg: '#ccc',
                // series为该题目的级数
                series: 5,
                font: ['完全不符合', '不太符合', '部分符合', '比较符合', '完全符合']

            },
            {
                ques: "为将来可能发生的问题找答案，是一件令人兴奋的事。",
                value: 0,
                id: 42,
                titleBorder: 0,
                progressPartbcg: '#ccc',
                // series为该题目的级数
                series: 5,
                font: ['完全不符合', '不太符合', '部分符合', '比较符合', '完全符合']

            },
            {
                ques: "我喜欢尝试新的事情。",
                value: 0,
                id: 43,
                titleBorder: 0,
                progressPartbcg: '#ccc',
                // series为该题目的级数
                series: 5,
                font: ['完全不符合', '不太符合', '部分符合', '比较符合', '完全符合']

            },
            {
                ques: "玩游戏时，我通常是有兴趣参加，而不在乎输赢。",
                value: 0,
                id: 44,
                titleBorder: 0,
                progressPartbcg: '#ccc',
                // series为该题目的级数
                series: 5,
                font: ['完全不符合', '不太符合', '部分符合', '比较符合', '完全符合']

            },
            {
                ques: "我喜欢想一些别人常常谈过的事情。",
                value: 0,
                id: 45,
                titleBorder: 0,
                progressPartbcg: '#ccc',
                // series为该题目的级数
                series: 5,
                font: ['完全不符合', '不太符合', '部分符合', '比较符合', '完全符合']

            },
            {
                ques: "当我看到一张陌生人的照片时，我喜欢去猜测他是怎么样一个人。",
                value: 0,
                id: 46,
                titleBorder: 0,
                progressPartbcg: '#ccc',
                // series为该题目的级数
                series: 5,
                font: ['完全不符合', '不太符合', '部分符合', '比较符合', '完全符合']

            },
            {
                ques: "我喜欢翻阅书籍及杂志，但只想知道它的内容是什么。",
                value: 0,
                id: 47,
                titleBorder: 0,
                progressPartbcg: '#ccc',
                // series为该题目的级数
                series: 5,
                font: ['完全不符合', '不太符合', '部分符合', '比较符合', '完全符合']

            },
            {
                ques: "我喜欢探寻事情发生的各种原因。",
                value: 0,
                id: 48,
                titleBorder: 0,
                progressPartbcg: '#ccc',
                // series为该题目的级数
                series: 5,
                font: ['完全不符合', '不太符合', '部分符合', '比较符合', '完全符合']

            },
            {
                ques: "我喜欢向别人问一些别人没有想到的问题。",
                value: 0,
                id: 49,
                titleBorder: 0,
                progressPartbcg: '#ccc',
                // series为该题目的级数
                series: 5,
                font: ['完全不符合', '不太符合', '部分符合', '比较符合', '完全符合']

            },
            {
                ques: "无论在家里或在学校，我总是喜欢做许多有趣的事。",
                value: 0,
                id: 50,
                titleBorder: 0,
                progressPartbcg: '#ccc',
                // series为该题目的级数
                series: 5,
                font: ['完全不符合', '不太符合', '部分符合', '比较符合', '完全符合']

            },
        ],
        end: {
            ok: '您已完成',
            title: "威廉斯创造力倾向表A",
            detail: '感谢您的答题，接下来还有两份问卷点击下方按钮继续答题',
            button: '继续答题'
        }
    },
    {
        status: {
            intro: true,
            survey: false,
            end: false,
            toSurvey() {
                this.intro = false;
                this.end = false;
                this.survey = true;
            },
            toEnd() {
                this.end = true;
                this.survey = false;
            }
        },
        intro: {
            title: "威廉斯创造力倾向表A",
            intro_title: "问卷介绍：",
            intro_content:
                "威廉斯创造力倾向表通过测验个人的一些性格特点包括冒险性、好奇性、想象力和挑战性，来测量个人的创造性倾向。这是一份帮助你了解自己创造力的练习。在下列的句子中，共有三种情形，“完全符合”、“部分符合”、“完全不符合”，选择最符合你自身情况的选项。切记，凭你自己的真实的感觉作答，选择最符合你自身情况的选项。",
            warn_title: "注意：",
            warn_content:
                "每一题都要做，不要花太多的时间去想。所有的题目都没有“正确答案”，凭你读每一句子后的第一印象作答。 虽然没有时间限制，但应尽可能地争取以较快的速度完成，愈快愈好。",
            button: "开始答题",
        },
        quesList: [
            {
                ques: "在学校里，我喜欢试着对事情或问题作猜测，即使不一定都猜对也无所谓。",
                value: 0,
                id: 1,
                titleBorder: 0,
                progressPartbcg: '#ccc',
                // series为该题目的级数
                series: 5,
                font: ['完全不符合', '不太符合', '部分符合', '比较符合', '完全符合']
            },
            {
                ques: "我喜欢仔细观察我没有看过的东西，以了解详细的情形。",
                value: 0,
                id: 2,
                titleBorder: 0,
                progressPartbcg: '#ccc',
                // series为该题目的级数
                series: 5,
                font: ['完全不符合', '不太符合', '部分符合', '比较符合', '完全符合']
            },
            {
                ques: "我喜欢听变化多端和富有想象力的故事。",
                value: 0,
                id: 3,
                titleBorder: 0,
                progressPartbcg: '#ccc',
                // series为该题目的级数
                series: 5,
                font: ['完全不符合', '不太符合', '部分符合', '比较符合', '完全符合']

            },
            {
                ques: "画图时我喜欢临摹别人的作品。",
                value: 0,
                id: 4,
                titleBorder: 0,
                progressPartbcg: '#ccc',
                // series为该题目的级数
                series: 5,
                font: ['完全不符合', '不太符合', '部分符合', '比较符合', '完全符合']

            },
            {
                ques: "我喜欢利用旧报纸、旧日历及旧罐头等废物来做成各种好玩的东西。",
                value: 0,
                id: 5,
                titleBorder: 0,
                progressPartbcg: '#ccc',
                // series为该题目的级数
                series: 5,
                font: ['完全不符合', '不太符合', '部分符合', '比较符合', '完全符合']

            },
            {
                ques: "我喜欢幻想一些我想知道或想做的事。",
                value: 0,
                id: 6,
                titleBorder: 0,
                progressPartbcg: '#ccc',
                series: 5,
                font: ['完全不符合', '不太符合', '部分符合', '比较符合', '完全符合']

            },
            {
                ques: "如果事情不能一次完成，我会继续尝试，直到成功为止。",
                value: 0,
                id: 7,
                titleBorder: 0,
                progressPartbcg: '#ccc',
                series: 5,
                font: ['完全不符合', '不太符合', '部分符合', '比较符合', '完全符合']

            },
            {
                ques: "做功课时我喜欢参考各种不同的资料，以便得到多方面的了解。",
                value: 0,
                id: 8,
                titleBorder: 0,
                progressPartbcg: '#ccc',
                // series为该题目的级数
                series: 5,
                font: ['完全不符合', '不太符合', '部分符合', '比较符合', '完全符合']

            },
            {
                ques: "我喜欢用相同的方法做事情，不喜欢去找其它新的方法。",
                value: 0,
                id: 9,
                titleBorder: 0,
                progressPartbcg: '#ccc',
                // series为该题目的级数
                series: 5,
                font: ['完全不符合', '不太符合', '部分符合', '比较符合', '完全符合']

            },
            {
                ques: "我喜欢探究事情的真假。",
                value: 0,
                id: 10,
                titleBorder: 0,
                progressPartbcg: '#ccc',
                // series为该题目的级数
                series: 5,
                font: ['完全不符合', '不太符合', '部分符合', '比较符合', '完全符合']

            },
            {
                ques: "我喜欢做许多新鲜的事。",
                value: 0,
                id: 11,
                titleBorder: 0,
                progressPartbcg: '#ccc',
                // series为该题目的级数
                series: 5,
                font: ['完全不符合', '不太符合', '部分符合', '比较符合', '完全符合']

            },
            {
                ques: "我不喜欢交新朋友。",
                value: 0,
                id: 12,
                titleBorder: 0,
                progressPartbcg: '#ccc',
                // series为该题目的级数
                series: 5,
                font: ['完全不符合', '不太符合', '部分符合', '比较符合', '完全符合']

            },
            {
                ques: "我喜欢想一些不会在我身上发生的事情。",
                value: 0,
                id: 13,
                titleBorder: 0,
                progressPartbcg: '#ccc',
                series: 5,
                font: ['完全不符合', '不太符合', '部分符合', '比较符合', '完全符合']

            },
            {
                ques: "我喜欢想象有一天能成为艺术家、音乐家或诗人。",
                value: 0,
                id: 14,
                titleBorder: 0,
                progressPartbcg: '#ccc',
                // series为该题目的级数
                series: 5,
                font: ['完全不符合', '不太符合', '部分符合', '比较符合', '完全符合']

            },
            {
                ques: "我会因为一些令人兴奋的念头而忘记了其它的事。",
                value: 0,
                id: 15,
                titleBorder: 0,
                progressPartbcg: '#ccc',
                // series为该题目的级数
                series: 5,
                font: ['完全不符合', '不太符合', '部分符合', '比较符合', '完全符合']

            },
            {
                ques: "我宁愿生活在太空站，也不喜欢住在地球上。",
                value: 0,
                id: 16,
                titleBorder: 0,
                progressPartbcg: '#ccc',
                // series为该题目的级数
                series: 5,
                font: ['完全不符合', '不太符合', '部分符合', '比较符合', '完全符合']

            },
            {
                ques: "我认为所有的问题都有固定的答案。",
                value: 0,
                id: 17,
                titleBorder: 0,
                progressPartbcg: '#ccc',
                // series为该题目的级数
                series: 5,
                font: ['完全不符合', '不太符合', '部分符合', '比较符合', '完全符合']

            },
            {
                ques: "我喜欢与众不同的事情。",
                value: 0,
                id: 18,
                titleBorder: 0,
                progressPartbcg: '#ccc',
                // series为该题目的级数
                series: 5,
                font: ['完全不符合', '不太符合', '部分符合', '比较符合', '完全符合']

            },
            {
                ques: "我常想要知道别人正在想什么。",
                value: 0,
                id: 19,
                titleBorder: 0,
                progressPartbcg: '#ccc',
                // series为该题目的级数
                series: 5,
                font: ['完全不符合', '不太符合', '部分符合', '比较符合', '完全符合']

            },
            {
                ques: "我喜欢故事或电视节目所描写的事。",
                value: 0,
                id: 20,
                titleBorder: 0,
                progressPartbcg: '#ccc',
                // series为该题目的级数
                series: 5,
                font: ['完全不符合', '不太符合', '部分符合', '比较符合', '完全符合']

            },
            {
                ques: "我喜欢和朋友一起，和他们分享我的想法。",
                value: 0,
                id: 21,
                titleBorder: 0,
                progressPartbcg: '#ccc',
                // series为该题目的级数
                series: 5,
                font: ['完全不符合', '不太符合', '部分符合', '比较符合', '完全符合']

            },
            {
                ques: "如果一本故事书的最后一页被撕掉了，我就自己编造一个故事，把结局补上去。",
                value: 0,
                id: 22,
                titleBorder: 0,
                progressPartbcg: '#ccc',
                // series为该题目的级数
                series: 5,
                font: ['完全不符合', '不太符合', '部分符合', '比较符合', '完全符合']

            },
            {
                ques: "我长大后，想做一些别人从没想过的事情。",
                value: 0,
                id: 23,
                titleBorder: 0,
                progressPartbcg: '#ccc',
                // series为该题目的级数
                series: 5,
                font: ['完全不符合', '不太符合', '部分符合', '比较符合', '完全符合']

            },
            {
                ques: "尝试新的游戏和活动，是一件有趣的事。",
                value: 0,
                id: 24,
                titleBorder: 0,
                progressPartbcg: '#ccc',
                // series为该题目的级数
                series: 5,
                font: ['完全不符合', '不太符合', '部分符合', '比较符合', '完全符合']

            },
            {
                ques: "我不喜欢太多的规则限制。",
                value: 0,
                id: 25,
                titleBorder: 0,
                progressPartbcg: '#ccc',
                // series为该题目的级数
                series: 5,
                font: ['完全不符合', '不太符合', '部分符合', '比较符合', '完全符合']

            },
            {
                ques: "我喜欢解决问题，即使没有正确的答案也没关系。",
                value: 0,
                id: 26,
                titleBorder: 0,
                progressPartbcg: '#ccc',
                // series为该题目的级数
                series: 5,
                font: ['完全不符合', '不太符合', '部分符合', '比较符合', '完全符合']

            },
            {
                ques: "有许多事情我都很想亲自尝试。",
                value: 0,
                id: 27,
                titleBorder: 0,
                progressPartbcg: '#ccc',
                // series为该题目的级数
                series: 5,
                font: ['完全不符合', '不太符合', '部分符合', '比较符合', '完全符合']

            },
            {
                ques: "我喜欢唱没有人知道的新歌。",
                value: 0,
                id: 28,
                titleBorder: 0,
                progressPartbcg: '#ccc',
                // series为该题目的级数
                series: 5,
                font: ['完全不符合', '不太符合', '部分符合', '比较符合', '完全符合']

            },
            {
                ques: "我不喜欢在班上同学面前发表意见。",
                value: 0,
                id: 29,
                titleBorder: 0,
                progressPartbcg: '#ccc',
                // series为该题目的级数
                series: 5,
                font: ['完全不符合', '不太符合', '部分符合', '比较符合', '完全符合']

            },
            {
                ques: "当我读小说或看电影时，我喜欢把自己想成故事中的人物。",
                value: 0,
                id: 30,
                titleBorder: 0,
                progressPartbcg: '#ccc',
                // series为该题目的级数
                series: 5,
                font: ['完全不符合', '不太符合', '部分符合', '比较符合', '完全符合']

            },
            {
                ques: "我喜欢幻想200年前人类生活的情形。",
                value: 0,
                id: 31,
                titleBorder: 0,
                progressPartbcg: '#ccc',
                // series为该题目的级数
                series: 5,
                font: ['完全不符合', '不太符合', '部分符合', '比较符合', '完全符合']

            },
            {
                ques: "我喜欢自己编一首新歌。",
                value: 0,
                id: 32,
                titleBorder: 0,
                progressPartbcg: '#ccc',
                // series为该题目的级数
                series: 5,
                font: ['完全不符合', '不太符合', '部分符合', '比较符合', '完全符合']

            },
            {
                ques: "我喜欢翻箱倒柜，看看有些什么东西在里面。",
                value: 0,
                id: 33,
                titleBorder: 0,
                progressPartbcg: '#ccc',
                // series为该题目的级数
                series: 5,
                font: ['完全不符合', '不太符合', '部分符合', '比较符合', '完全符合']

            },
            {
                ques: "画图时，我很喜欢改变各种东西的颜色和形状。",
                value: 0,
                id: 34,
                titleBorder: 0,
                progressPartbcg: '#ccc',
                // series为该题目的级数
                series: 5,
                font: ['完全不符合', '不太符合', '部分符合', '比较符合', '完全符合']

            },
            {
                ques: "我不敢确定我对事情的看法都是对的。",
                value: 0,
                id: 35,
                titleBorder: 0,
                progressPartbcg: '#ccc',
                // series为该题目的级数
                series: 5,
                font: ['完全不符合', '不太符合', '部分符合', '比较符合', '完全符合']

            },
            {
                ques: "对于一件事情先猜猜看，然后再看是不是猜对了，这种方法很有趣。",
                value: 0,
                id: 36,
                titleBorder: 0,
                progressPartbcg: '#ccc',
                // series为该题目的级数
                series: 5,
                font: ['完全不符合', '不太符合', '部分符合', '比较符合', '完全符合']

            },
            {
                ques: "玩猜谜之类的游戏很有趣，因为我想要知道结果如何。",
                value: 0,
                id: 37,
                titleBorder: 0,
                progressPartbcg: '#ccc',
                // series为该题目的级数
                series: 5,
                font: ['完全不符合', '不太符合', '部分符合', '比较符合', '完全符合']

            },
            {
                ques: "我对机器有兴趣，也很想知道它里面是什么样子，以及它是怎样转动的。",
                value: 0,
                id: 38,
                titleBorder: 0,
                progressPartbcg: '#ccc',
                // series为该题目的级数
                series: 5,
                font: ['完全不符合', '不太符合', '部分符合', '比较符合', '完全符合']

            },
            {
                ques: "我喜欢可以拆开来的玩具。",
                value: 0,
                id: 39,
                titleBorder: 0,
                progressPartbcg: '#ccc',
                // series为该题目的级数
                series: 5,
                font: ['完全不符合', '不太符合', '部分符合', '比较符合', '完全符合']

            },
            {
                ques: "我喜欢想一些新点子，即使用不着也无所谓。",
                value: 0,
                id: 40,
                titleBorder: 0,
                progressPartbcg: '#ccc',
                // series为该题目的级数
                series: 5,
                font: ['完全不符合', '不太符合', '部分符合', '比较符合', '完全符合']

            },
            {
                ques: "一篇好的文章应该包含许多不同的意见或观点。",
                value: 0,
                id: 41,
                titleBorder: 0,
                progressPartbcg: '#ccc',
                // series为该题目的级数
                series: 5,
                font: ['完全不符合', '不太符合', '部分符合', '比较符合', '完全符合']

            },
            {
                ques: "为将来可能发生的问题找答案，是一件令人兴奋的事。",
                value: 0,
                id: 42,
                titleBorder: 0,
                progressPartbcg: '#ccc',
                // series为该题目的级数
                series: 5,
                font: ['完全不符合', '不太符合', '部分符合', '比较符合', '完全符合']

            },
            {
                ques: "我喜欢尝试新的事情。",
                value: 0,
                id: 43,
                titleBorder: 0,
                progressPartbcg: '#ccc',
                // series为该题目的级数
                series: 5,
                font: ['完全不符合', '不太符合', '部分符合', '比较符合', '完全符合']

            },
            {
                ques: "玩游戏时，我通常是有兴趣参加，而不在乎输赢。",
                value: 0,
                id: 44,
                titleBorder: 0,
                progressPartbcg: '#ccc',
                // series为该题目的级数
                series: 5,
                font: ['完全不符合', '不太符合', '部分符合', '比较符合', '完全符合']

            },
            {
                ques: "我喜欢想一些别人常常谈过的事情。",
                value: 0,
                id: 45,
                titleBorder: 0,
                progressPartbcg: '#ccc',
                // series为该题目的级数
                series: 5,
                font: ['完全不符合', '不太符合', '部分符合', '比较符合', '完全符合']

            },
            {
                ques: "当我看到一张陌生人的照片时，我喜欢去猜测他是怎么样一个人。",
                value: 0,
                id: 46,
                titleBorder: 0,
                progressPartbcg: '#ccc',
                // series为该题目的级数
                series: 5,
                font: ['完全不符合', '不太符合', '部分符合', '比较符合', '完全符合']

            },
            {
                ques: "我喜欢翻阅书籍及杂志，但只想知道它的内容是什么。",
                value: 0,
                id: 47,
                titleBorder: 0,
                progressPartbcg: '#ccc',
                // series为该题目的级数
                series: 5,
                font: ['完全不符合', '不太符合', '部分符合', '比较符合', '完全符合']

            },
            {
                ques: "我喜欢探寻事情发生的各种原因。",
                value: 0,
                id: 48,
                titleBorder: 0,
                progressPartbcg: '#ccc',
                // series为该题目的级数
                series: 5,
                font: ['完全不符合', '不太符合', '部分符合', '比较符合', '完全符合']

            },
            {
                ques: "我喜欢向别人问一些别人没有想到的问题。",
                value: 0,
                id: 49,
                titleBorder: 0,
                progressPartbcg: '#ccc',
                // series为该题目的级数
                series: 5,
                font: ['完全不符合', '不太符合', '部分符合', '比较符合', '完全符合']

            },
            {
                ques: "无论在家里或在学校，我总是喜欢做许多有趣的事。",
                value: 0,
                id: 50,
                titleBorder: 0,
                progressPartbcg: '#ccc',
                // series为该题目的级数
                series: 5,
                font: ['完全不符合', '不太符合', '部分符合', '比较符合', '完全符合']

            },
        ],
        end: {
            ok: '您已完成',
            title: "威廉斯创造力倾向表A",
            detail: '感谢您的答题，接下来还有两份问卷点击下方按钮继续答题',
            button: '继续答题'
        }
    }
]
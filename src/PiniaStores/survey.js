export const survey1 = [
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
            },
            {
                ques: "我喜欢仔细观察我没有看过的东西，以了解详细的情形。",
                value: 0,
            },
            {
                ques: "我喜欢听变化多端和富有想象力的故事。",
                value: 0,
            },
            {
                ques: "画图时我喜欢临摹别人的作品。",
                value: 0,
            },
            {
                ques: "我喜欢利用旧报纸、旧日历及旧罐头等废物来做成各种好玩的东西。",
                value: 0,
            },
            {
                ques: "我喜欢幻想一些我想知道或想做的事。",
                value: 0,
            },
            {
                ques: "如果事情不能一次完成，我会继续尝试，直到成功为止。",
                value: 0,
            },
            {
                ques: "做功课时我喜欢参考各种不同的资料，以便得到多方面的了解。",
                value: 0,
            },
            {
                ques: "我喜欢用相同的方法做事情，不喜欢去找其它新的方法。",
                value: 0,
            },
            {
                ques: "我喜欢探究事情的真假。",
                value: 0,
            },
            {
                ques: "我喜欢做许多新鲜的事。",
                value: 0,
            },
            {
                ques: "我不喜欢交新朋友。",
                value: 0,
            },
            {
                ques: "我喜欢想一些不会在我身上发生的事情。",
                value: 0,
            },
            {
                ques: "我喜欢想象有一天能成为艺术家、音乐家或诗人。",
                value: 0,
            },
            {
                ques: "我会因为一些令人兴奋的念头而忘记了其它的事。",
                value: 0,
            },
            {
                ques: "我宁愿生活在太空站，也不喜欢住在地球上。",
                value: 0,
            },
            {
                ques: "我认为所有的问题都有固定的答案。",
                value: 0,
            },
            {
                ques: "我喜欢与众不同的事情。",
                value: 0,
            },
            {
                ques: "我常想要知道别人正在想什么。",
                value: 0,
            },
            {
                ques: "我喜欢故事或电视节目所描写的事。",
                value: 0,
            },
            {
                ques: "我喜欢和朋友一起，和他们分享我的想法。",
                value: 0,
            },
            {
                ques: "如果一本故事书的最后一页被撕掉了，我就自己编造一个故事，把结局补上去。",
                value: 0,
            },
            {
                ques: "我长大后，想做一些别人从没想过的事情。",
                value: 0,
            },
            {
                ques: "尝试新的游戏和活动，是一件有趣的事。",
                value: 0,
            },
            {
                ques: "我不喜欢太多的规则限制。",
                value: 0,
            },
            {
                ques: "我喜欢解决问题，即使没有正确的答案也没关系。",
                value: 0,
            },
            {
                ques: "有许多事情我都很想亲自尝试。",
                value: 0,
            },
            {
                ques: "我喜欢唱没有人知道的新歌。",
                value: 0,
            },
            {
                ques: "我不喜欢在班上同学面前发表意见。",
                value: 0,
            },
            {
                ques: "当我读小说或看电影时，我喜欢把自己想成故事中的人物。",
                value: 0,
            },
            {
                ques: "我喜欢幻想200年前人类生活的情形。",
                value: 0,
            },
            {
                ques: "我喜欢自己编一首新歌。",
                value: 0,
            },
            {
                ques: "我喜欢翻箱倒柜，看看有些什么东西在里面。",
                value: 0,
            },
            {
                ques: "画图时，我很喜欢改变各种东西的颜色和形状。",
                value: 0,
            },
            {
                ques: "我不敢确定我对事情的看法都是对的。",
                value: 0,
            },
            {
                ques: "对于一件事情先猜猜看，然后再看是不是猜对了，这种方法很有趣。",
                value: 0,
            },
            {
                ques: "玩猜谜之类的游戏很有趣，因为我想要知道结果如何。",
                value: 0,
            },
            {
                ques: "我对机器有兴趣，也很想知道它里面是什么样子，以及它是怎样转动的。",
                value: 0,
            },
            {
                ques: "我喜欢可以拆开来的玩具。",
                value: 0,
            },
            {
                ques: "我喜欢想一些新点子，即使用不着也无所谓。",
                value: 0,
            },
            {
                ques: "一篇好的文章应该包含许多不同的意见或观点。",
                value: 0,
            },
            {
                ques: "为将来可能发生的问题找答案，是一件令人兴奋的事。",
                value: 0,
            },
            {
                ques: "我喜欢尝试新的事情。",
                value: 0,
            },
            {
                ques: "玩游戏时，我通常是有兴趣参加，而不在乎输赢。",
                value: 0,
            },
            {
                ques: "我喜欢想一些别人常常谈过的事情。",
                value: 0,
            },
            {
                ques: "当我看到一张陌生人的照片时，我喜欢去猜测他是怎么样一个人。",
                value: 0,
            },
            {
                ques: "我喜欢翻阅书籍及杂志，但只想知道它的内容是什么。",
                value: 0,
            },
            {
                ques: "我喜欢探寻事情发生的各种原因。",
                value: 0,
            },
            {
                ques: "我喜欢向别人问一些别人没有想到的问题。",
                value: 0,
            },
            {
                ques: "无论在家里或在学校，我总是喜欢做许多有趣的事。",
                value: 0,
            },
        ],
        end: {
            ok:'您已完成',
            title:"威廉斯创造力倾向表A",
            detail: '感谢您的答题，接下来还有两份问卷点击下方按钮继续答题',
            button:'继续答题'
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
            title: "威廉斯创造力倾向表B",
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
            },
            {
                ques: "我喜欢仔细观察我没有看过的东西，以了解详细的情形。",
                value: 0,
            },
            {
                ques: "我喜欢听变化多端和富有想象力的故事。",
                value: 0,
            },
            {
                ques: "画图时我喜欢临摹别人的作品。",
                value: 0,
            },
            {
                ques: "我喜欢利用旧报纸、旧日历及旧罐头等废物来做成各种好玩的东西。",
                value: 0,
            },
            {
                ques: "我喜欢幻想一些我想知道或想做的事。",
                value: 0,
            },
            {
                ques: "如果事情不能一次完成，我会继续尝试，直到成功为止。",
                value: 0,
            },
            {
                ques: "做功课时我喜欢参考各种不同的资料，以便得到多方面的了解。",
                value: 0,
            },
            {
                ques: "我喜欢用相同的方法做事情，不喜欢去找其它新的方法。",
                value: 0,
            },
            {
                ques: "我喜欢探究事情的真假。",
                value: 0,
            },
            {
                ques: "我喜欢做许多新鲜的事。",
                value: 0,
            },
            {
                ques: "我不喜欢交新朋友。",
                value: 0,
            },
            {
                ques: "我喜欢想一些不会在我身上发生的事情。",
                value: 0,
            },
            {
                ques: "我喜欢想象有一天能成为艺术家、音乐家或诗人。",
                value: 0,
            },
            {
                ques: "我会因为一些令人兴奋的念头而忘记了其它的事。",
                value: 0,
            },
            {
                ques: "我宁愿生活在太空站，也不喜欢住在地球上。",
                value: 0,
            },
            {
                ques: "我认为所有的问题都有固定的答案。",
                value: 0,
            },
            {
                ques: "我喜欢与众不同的事情。",
                value: 0,
            },
            {
                ques: "我常想要知道别人正在想什么。",
                value: 0,
            },
            {
                ques: "我喜欢故事或电视节目所描写的事。",
                value: 0,
            },
            {
                ques: "我喜欢和朋友一起，和他们分享我的想法。",
                value: 0,
            },
            {
                ques: "如果一本故事书的最后一页被撕掉了，我就自己编造一个故事，把结局补上去。",
                value: 0,
            },
            {
                ques: "我长大后，想做一些别人从没想过的事情。",
                value: 0,
            },
            {
                ques: "尝试新的游戏和活动，是一件有趣的事。",
                value: 0,
            },
            {
                ques: "我不喜欢太多的规则限制。",
                value: 0,
            },
            {
                ques: "我喜欢解决问题，即使没有正确的答案也没关系。",
                value: 0,
            },
            {
                ques: "有许多事情我都很想亲自尝试。",
                value: 0,
            },
            {
                ques: "我喜欢唱没有人知道的新歌。",
                value: 0,
            },
            {
                ques: "我不喜欢在班上同学面前发表意见。",
                value: 0,
            },
            {
                ques: "当我读小说或看电影时，我喜欢把自己想成故事中的人物。",
                value: 0,
            },
            {
                ques: "我喜欢幻想200年前人类生活的情形。",
                value: 0,
            },
            {
                ques: "我喜欢自己编一首新歌。",
                value: 0,
            },
            {
                ques: "我喜欢翻箱倒柜，看看有些什么东西在里面。",
                value: 0,
            },
            {
                ques: "画图时，我很喜欢改变各种东西的颜色和形状。",
                value: 0,
            },
            {
                ques: "我不敢确定我对事情的看法都是对的。",
                value: 0,
            },
            {
                ques: "对于一件事情先猜猜看，然后再看是不是猜对了，这种方法很有趣。",
                value: 0,
            },
            {
                ques: "玩猜谜之类的游戏很有趣，因为我想要知道结果如何。",
                value: 0,
            },
            {
                ques: "我对机器有兴趣，也很想知道它里面是什么样子，以及它是怎样转动的。",
                value: 0,
            },
            {
                ques: "我喜欢可以拆开来的玩具。",
                value: 0,
            },
            {
                ques: "我喜欢想一些新点子，即使用不着也无所谓。",
                value: 0,
            },
            {
                ques: "一篇好的文章应该包含许多不同的意见或观点。",
                value: 0,
            },
            {
                ques: "为将来可能发生的问题找答案，是一件令人兴奋的事。",
                value: 0,
            },
            {
                ques: "我喜欢尝试新的事情。",
                value: 0,
            },
            {
                ques: "玩游戏时，我通常是有兴趣参加，而不在乎输赢。",
                value: 0,
            },
            {
                ques: "我喜欢想一些别人常常谈过的事情。",
                value: 0,
            },
            {
                ques: "当我看到一张陌生人的照片时，我喜欢去猜测他是怎么样一个人。",
                value: 0,
            },
            {
                ques: "我喜欢翻阅书籍及杂志，但只想知道它的内容是什么。",
                value: 0,
            },
            {
                ques: "我喜欢探寻事情发生的各种原因。",
                value: 0,
            },
            {
                ques: "我喜欢向别人问一些别人没有想到的问题。",
                value: 0,
            },
            {
                ques: "无论在家里或在学校，我总是喜欢做许多有趣的事。",
                value: 0,
            },
        ],
        end: {
            ok:'您已完成',
            title:"威廉斯创造力倾向表B",
            detail: '感谢您的答题，接下来还有一份问卷点击下方按钮继续答题',
            button:'继续答题'
        }
    }
]

export const survey2 = [
    {
        intro: {
            info_title : '贝尔宾团队角色理论\n-团队角色自测问卷',
            info_para: '对下列问题的回答，可能在不同程度上描绘了您的行为。每题有8句话，请将10分分配给这8个句子。\n\n分配的原则是：最体现您行为的句子分最高，以此类推。最极端的情况可能是10分全部分配给其中一句话。请根据您的实际情况填入您每题的分数，系统会自动计算出每个角色的得分。得分最高的2-3个角色便是您的团队角色。',
        },
        questionIntro :{
            title: '贝尔宾团队角色理论-团队角色自测问卷',
            sec_title: '问卷介绍：',
            para: '对下列问题的回答，可能在不同程度上描绘了您的行为。每题有8句话，请将10分分配给这8个句子。分配的原则是：最体现您行为的句子分最高，以此类推。最极端的情况可能是10分全部分配给其中一句话。请根据您的实际情况填入您每题的分数，系统会自动计算出每个角色的得分。得分最高的2-3个角色便是您的团队角色。',
        },
        questionList:[
            {
                id: 1,
                questiontitle: '一、我认为我能为团队做出的贡献是：',
                score: 10,
                //分配分数的时候要用到staticScore
                staticScore:10,
                // slider的背景颜色
                bcg: '#f5f5f5',
               //滑块的样式
                silderSrc: '/blue.png',
                titleBorder: 0,
                progressPartbcg: '#ccc',
                question: [
                    {
                        detail: 'A. 我能很快地发现并把握住新的机遇。',
                        value: 0,
                        isEdit: false,
                    },
                    {
                        detail: 'B. 我能与各种类型的人一起合作共事。',
                        value: 0,
                        isEdit: false,
                    },
                    {
                        detail: 'C. 我生来就爱出主意。',
                        value: 0,
                        isEdit: false,
                    },
                    {
                        detail: 'D. 我的能力在于，一旦发现某些对实现集体目标很有价值的人，我就及时把他们推荐出来',
                        value: 0,
                        isEdit: false,
                    },
                    {
                        detail: 'E. 我能把事情办成，这主要靠我个人的实力。',
                        value: 0,
                        isEdit: false,
                    },
                    {
                        detail: 'F.如果最终能导致有益的结果，我愿面对暂时的冷遇。',
                        value: 0,
                        isEdit: false,
                    },
                    {
                        detail: 'G. 我通常能意识到什么是现实的，什么是可能的。',
                        value: 0,
                        isEdit: false,
                    },
                    {
                        detail: 'H. 在选择行动方案时，我能不带倾向性，也不带偏见地提出一个合理的方案。',
                        value: 0,
                        isEdit: false,
                    }],
            },
            {
                id: 2,
                questiontitle: '二、在团队中，我可能有的弱点是：',
                score: 10,
             //分配分数的时候要用到staticScore
                staticScore:10,
                // slider的背景颜色
                bcg: '#f5f5f5',
               //滑块的样式
                silderSrc: '/blue.png',
                titleBorder: 0,
                 progressPartbcg :'#ccc',
                question: [
                    {
                        detail: 'A.如果会议没有得到很好的组织、控制和主持，我会感到不痛快。',
                        value: 0,
                        isEdit: false,
                    },
                    {
                        detail: 'B.我容易对那些有高见而又没有适当地发表出来的人表现得过于宽容。',
                        value: 0,
                        isEdit: false,
                    },
                    {
                        detail: 'C.只要集体在讨论新的观点，我总是说的太多。',
                        value: 0,
                        isEdit: false,
                    },
                    {
                        detail: 'D.我的客观算法，使我很难与同事们打成一片。',
                        value: 0,
                        isEdit: false,
                    },
                    {
                        detail: 'E.在一定要把事情办成的情况下，我有时使人感到特别强硬以至专断。',
                        value: 0,
                        isEdit: false,
                    },
                    {
                        detail: 'F.可能由于我过分重视集体的气氛，我发现自己很难与众不同。',
                        value: 0,
                        isEdit: false,
                    },
                    {
                        detail: 'G.我易于陷入突发的想象之中，而忘了正在进行的事情。',
                        value: 0,
                        isEdit: false,
                    },
                    {
                        detail: 'H.我的同事认为我过分注意细节，总有不必要的担心，怕把事情搞糟。',
                        value: 0,
                        isEdit: false,
                    }],

            },
            {
                id: 3,
                questiontitle: '三、当我与其他人共同进行一项工作时：',
                score: 10,
                //分配分数的时候要用到staticScore
                staticScore:10,
                // slider的背景颜色
                bcg: '#f5f5f5',
               //滑块的样式
                silderSrc: '/blue.png',
                titleBorder:0,
                progressPartbcg :'#ccc',
                question: [
                    {
                        detail: 'A.我有在不施加任何压力的情况下，去影响其他人的能力。',
                        value: 0,
                        isEdit: false,
                    },
                    {
                        detail: 'B.我随时注意防止粗心和工作中的疏忽。',
                        value: 0,
                        isEdit: false,
                    },
                    {
                        detail: 'C.我愿意施加压力以换取行动，确保会议不是在浪费时间或离题太远。',
                        value: 0,
                        isEdit: false,
                    },
                    {
                        detail: 'D.在提出独到见解方面，我是数一数二的。',
                        value: 0,
                        isEdit: false,
                    },
                    {
                        detail: 'E.对于与大家共同利益有关的积极建议我总是乐于支持的。',
                        value: 0,
                        isEdit: false,
                    },
                    {
                        detail: 'F.我热衷寻求最新的思想和新的发展。',
                        value: 0,
                        isEdit: false,
                    },
                    {
                        detail: 'G.我相信我的判断能力有助于做出正确的决策。',
                        value: 0,
                        isEdit: false,
                    },
                    {
                        detail: 'H.我能使人放心的是，对那些最基本的工作，我都能组织得“井井有条”。',
                        value: 0,
                        isEdit: false,
                    }],

            
            },
            {
                id: 4,
                questiontitle: '四、我在工作团队中的特征是：',
                score: 10,
                //分配分数的时候要用到staticScore
                staticScore:10,
                // slider的背景颜色
                bcg: '#f5f5f5',
                //滑块的样式
                silderSrc: '/blue.png',
                titleBorder: 0,
                progressPartbcg :'#ccc',
                question: [
                    {
                        detail: 'A.我有兴趣更多地了解我的同事。',
                        value: 0,
                        isEdit: false,
                    },
                    {
                        detail: 'B.我经常向别人的见解进行挑战或坚持自己的意见。',
                        value: 0,
                        isEdit: false,
                    },
                    {
                        detail: 'C.在辩论中，我通常能找到论据去推翻那些不甚有理的主张。',
                        value: 0,
                        isEdit: false,
                    },
                    {
                        detail: 'D.我认为，只要计划必须开始执行，我有推动工作运转的才能。',
                        value: 0,
                        isEdit: false,
                    },
                    {
                        detail: 'E. 我有意避免使自己太突出或出人意料。',
                        value: 0,
                        isEdit: false,
                    },
                    {
                        detail: 'F.对承担的任何工作，我都能做到尽善尽美。',
                        value: 0,
                        isEdit: false,
                    },
                    {
                        detail: 'G. 我乐于与工作团队以外的人进行联系。',
                        value: 0,
                        isEdit: false,
                    },
                    {
                        detail: 'H. 尽管我对所有的观点都感兴趣，但这并不影响我在必要的时候下决心。',
                        value: 0,
                        isEdit: false,
                    }],

                
            },
            {
                id: 5,
                questiontitle: '五、在工作中，我得到满足，因为：',
                score: 10,
                //分配分数的时候要用到staticScore
                staticScore: 10, 
                //分配分数的时候要用到staticScore
                staticScore:10,
                // slider的背景颜色
                bcg: '#f5f5f5',
               //滑块的样式
                silderSrc: '/blue.png',
                titleBorder: 0,
                progressPartbcg :'#ccc',
                question: [
                    {
                        detail: 'A. 我喜欢分析情况，权衡所有可能的选择。',
                        value: 0,
                        isEdit: false,
                    },
                    {
                        detail: 'B. 我对寻找解决问题的可行方案感兴趣。',
                        value: 0,
                        isEdit: false,
                    },
                    {
                        detail: 'C. 我感到，我在促进良好的工作关系。',
                        value: 0,
                        isEdit: false,
                    },
                    {
                        detail: 'D. 我能对决策有强烈的影响。',
                        value: 0,
                        isEdit: false,
                    },
                    {
                        detail: 'E. 我能适应那些有新意的人。',
                        value: 0,
                        isEdit: false,
                    },
                    {
                        detail: 'F.我能使人们在某项必要的行动上达成一致意见。',
                        value: 0,
                        isEdit: false,
                    },
                    {
                        detail: 'G. 我感到我的身上有一种能使我全身心地投入到工作中去的气质。',
                        value: 0,
                        isEdit: false,
                    },
                    {
                        detail: 'H. 我很高兴能找到一块可以发挥我想象力的天地。',
                        value: 0,
                        isEdit: false,
                    }],

                
            },
            {
                id: 6,
                questiontitle: '六、如果突然给我一件困难的工作，而且时间有限，人员不熟：',
                score: 10,
                //分配分数的时候要用到staticScore
                staticScore:10,
                // slider的背景颜色
                bcg: '#f5f5f5',
                //滑块的样式
                silderSrc: '/blue.png',
                titleBorder: 0,
                progressPartbcg :'#ccc',
                question: [
                    {
                        detail: 'A. 在有新方案之前，我宁愿先躲进角落，拟定出一个解脱困境的方案。',
                        value: 0,
                        isEdit: false,
                    },
                    {
                        detail: 'B. 我比较愿意与那些表现出积极态度的人一道工作。',
                        value: 0,
                        isEdit: false,
                    },
                    {
                        detail: 'C. 我会设想通过用人所长的方法来减轻工作负担。',
                        value: 0,
                        isEdit: false,
                    },
                    {
                        detail: 'D. 我天生的紧迫感，将有助于我们不会落在计划后面。',
                        value: 0,
                        isEdit: false,
                    },
                    {
                        detail: 'E. 我认为我能保持头脑冷静，富有条理地思考问题。',
                        value: 0,
                        isEdit: false,
                    },
                    {
                        detail: 'F.尽管困难重重，我也能保证目标始终如一。',
                        value: 0,
                        isEdit: false,
                    },
                    {
                        detail: 'G. 如果集体工作没有进展，我会采取积极措施去加以推动。',
                        value: 0,
                        isEdit: false,
                    },
                    {
                        detail: 'H. 我愿意展开广泛的讨论意在激发新思想，推动工作。',
                        value: 0,
                        isEdit: false,
                    }],

                
            },
            {
                id: 7,
                questiontitle: '七、对于那些在团队工作中或与周围人共事时所遇到的问题：',
                score: 10,
                //分配分数的时候要用到staticScore
                 staticScore:10,
                // slider的背景颜色
                bcg: '#f5f5f5',
               //滑块的样式
                silderSrc: '/blue.png',
                titleBorder: 0,
                progressPartbcg :'#ccc',
                question: [
                    {
                        detail: 'A. 我很容易对那些阻碍前进的人表现出不耐烦。',
                        value: 0,
                        isEdit: false,
                    },
                    {
                        detail: 'B. 别人可能批评我太重分析而缺少直觉。',
                        value: 0,
                        isEdit: false,
                    },
                    {
                        detail: 'C. 我有做好工作的愿望，能确保工作的持续进展。',
                        value: 0,
                        isEdit: false,
                    },
                    {
                        detail: 'D. 我常常容易产生厌烦感，需要一、二个有激情的人使我振作起来。',
                        value: 0,
                        isEdit: false,
                    },
                    {
                        detail: 'E. 如果目标不明确， 让我起步是很困难的。',
                        value: 0,
                        isEdit: false,
                    },
                    {
                        detail: 'F.对于我遇到的复杂问题，我有时不善于加以解释和澄清。',
                        value: 0,
                        isEdit: false,
                    },
                    {
                        detail: 'G. 对于那些我不能做的事，我有意识地求助于他人。',
                        value: 0,
                        isEdit: false,
                    },
                    {
                        detail: 'H. 当我与真正的对立面发生冲突时，我没有把握使对方理解我的观点。',
                        value: 0,
                        isEdit: false,
                    }],
                
            },
        ],
        end :{
            finish: '您已完成',
            para: '感谢您的答题，本次问卷已全部结束',
            button:'完成答题'
        }
    }


]
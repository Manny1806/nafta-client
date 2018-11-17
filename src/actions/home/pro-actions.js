export const PRO_POSTS_REQUEST = 'PRO_POST_REQUEST'
export const fetchProPostsRequest = () =>({
    type: PRO_POSTS_REQUEST
})

export const PRO_POSTS_SUCCESS = 'PRO_POST_SUCCESS'
export const fetchProPostsSuccess = (posts) =>({
    type: PRO_POSTS_SUCCESS,
    proPosts: [{
        title: "WalMart",
        quote: "The new Nafta is really cool!"
                },
        {
           title: "Greedy McGreederson",
           quote: "Lorem ipsum dolor sit amet, corpora copiosae reprimique eum cu. Qui eu gubergren instructior, mel at iudico nusquam consequat. Eu minim rationibus mea, quodsi corrumpit te mel. Ad feugiat consequuntur quo, in vis lorem altera iisque. Est eu brute inimicus intellegebat. Ne cum apeirian senserit salutatus, sint epicuri appellantur has id." 
        },
        {
            title: "Freetrade Fred",
            quote: "Corpora copiosae reprimique eum cu. Qui eu gubergren instructior, mel at iudico nusquam consequat. Eu minim rationibus mea, quodsi corrumpit te mel. Ad feugiat consequuntur quo, in vis lorem altera iisque. Est eu brute inimicus intellegebat. Ne cum apeirian senserit salutatus, sint epicuri appellantur has id." 
        },
        {
            title: "Amazon",
            quote: "Eum cu. Qui eu gubergren instructior, mel at iudico nusquam consequat. Eu minim rationibus mea, quodsi corrumpit te mel. Ad feugiat consequuntur quo, in vis lorem altera iisque. Est eu brute inimicus intellegebat. Ne cum apeirian senserit salutatus, sint epicuri appellantur has id." 
        },
        {
            title: "Billionaire One",
            quote: "Lorem ipsum dolor sit amet, corpora copiosae reprimique eum cu. Qui eu gubergren instructior, mel at iudico nusquam consequat. Eu minim rationibus mea, quodsi corrumpit te mel. Ad feugiat consequuntur quo, in vis lorem altera iisque. Est eu brute inimicus intellegebat. Ne cum apeirian senserit salutatus, sint epicuri appellantur has id." 
        },
        {
            title: "Money McGreederson",
            quote: "Copiosae reprimique eum cu. Qui eu gubergren instructior, mel at iudico nusquam consequat. Eu minim rationibus mea, quodsi corrumpit te mel. Ad feugiat consequuntur quo, in vis lorem altera iisque. Est eu brute inimicus intellegebat. Ne cum apeirian senserit salutatus, sint epicuri appellantur has id." 
        },
]
})

export const fetchProPosts = () => dispatch =>{
    console.log("triggered")
    dispatch(fetchProPostsSuccess())
}
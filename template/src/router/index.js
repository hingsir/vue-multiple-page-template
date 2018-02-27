import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

var router = new Router({
    linkActiveClass: 'active',
    routes: [{
            path: '/',
            name: 'index',
            component: (resolve) => {
                require(['@/components/index/index'], resolve)
            }
        },
        {
            path: '*',
            redirect: '/'
        }
    ]
})

export { router, Router }

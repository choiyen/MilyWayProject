export const paths = {
    Address: {
        search: {
            defaul: {
                path: "/address/search",
                getHref: () => "/address/search",
            },
            Date: {
                path: "/address/search/Date",
                getHref: () => "/address/search/Date",
            },
        },
        basic: {
            path: "/address",
            getHref: () => "/address",
        }, //Post : Insert, Put, Delete
    },
    Administration: {
        search: {
            path: "/time/search",
            getHref: () => "/time/search",
        },
        basic: {
            path: "/time",
            getHref: () => "/time",
        },
    },
    forum: {
        Board: {
            basic: {
                path: "/board",
                getHref: () => "/board",
            },
            search: {
                path: "/board/search/page",
                getHref: () => "/board/search/page",
            },
            param: {
                path: "/board/search",
                getHref: () => "/board/search",
            },
        },
        Comment: {
            basic: {
                path: "/comment",
                getHref: () => "/comment",
            },
            search: {
                Board: {
                    path: "/comment/search/panel",
                    getHref: () => "/board/search/panel",
                },
                Comment: {
                    path: "/comment/search",
                    getHref: () => "/comment/search",
                },
            },
        },
    },
    Inqurie: {
        basic: {
            path: "/inqurie",
            getHref: () => "/inqurie",
        },
        serach: {
            path: "/inqurie/search",
            getHref: () => "/inqurie/search",
            page: {
                path: "/inqurie/search/page",
                getHref: () => "/inqurie/search/page",
            },
        },
    }, //수정 기능 지원하지 않음
    Certification: {
        basic: {
            path: "/auth",
            getHref: () => "/auth",
        },
        login: {
            path: "/auth/login",
            getHref: () => "/auth/login",
        },
        logout: {
            path: "/auth/logout",
            getHref: () => "/auth/logout",
        },
        serach: {
            path: "/auth/search",
            getHref: () => "/auth/search",
        },
        check: {
            path: "/auth/check",
            getHref: () => "/auth/check",
        },
    },
    Notice: {
        basic: {
            path: "/notice",
            getHref: () => "/notice",
        },
        serach: {
            path: "/notice/search",
            getHref: () => "/notice/search",
        }, //Get은 개별 내역, Post는 전체 내역
        Type: {
            path: "/notice/search/Type",
            getHref: () => "/notice/search/Type",
        },
    },
    Question: {
        basic: {
            path: "/question",
            getHref: () => "/question",
        },
        serach: {
            path: "/question/search",
            getHref: () => "/question/search",
        }, //Get은 개별 내역, Post는 전체 내역
    },
    reserve: {
        basic: {
            path: "/reserve",
            getHref: () => "/reserve",
        },
        serach: {
            path: "/reserve/search",
            getHref: () => "/reserve/search",
        }, //Get은 개별 내역, Post는 전체 내역
    },
};

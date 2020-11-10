import {request} from './request'

export function getHomeMenus(){
    return request({
        url:'/menus'
    })
}

export function getUserList(params){
    return request({
        url:'/users',
        params
    })
}

export function changeUserState(user){
    return request({
        url:`/users/${user.id}/state/${user.mg_state}`,
        method:'put'
    })
}

export function addUser(user){
    return request({
        url:'/users',
        method:'post',
        data:user
    })
}

export function getUserInfo(id){
    return request({
        url:`/users/${id}`
    })
}

export function editUserInfo(id,data){
    return request({
        url:`/users/${id}/`,
        method:'put',
        data
    })
}

export function deleteUser(id){
    return request({
        url:`/users/${id}/`,
        method:'delete'
    })
}
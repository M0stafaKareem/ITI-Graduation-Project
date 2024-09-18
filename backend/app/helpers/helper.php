<?php

if (!function_exists('permissionCheck')) {
    function permissionCheck($route_name)
    {
        if (auth()->check()) {
            if (auth()->user()->role_id == 0) {
                return false;
            }
            if (auth()->user()->role->type == "system_user") {
                return TRUE;
            } else {
                $roles = app('permission_list');
                $role = $roles->where('id', auth()->user()->role_id)->first();
                if ($role != null && $role->permissions->contains('route', $route_name)) {
                    return TRUE;
                } else {
                    return FALSE;
                }
            }
        }
        return FALSE;
    }
}
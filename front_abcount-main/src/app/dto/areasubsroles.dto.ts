// FOR TAB 

export interface AreaSubsAndRoles {
    areasAndSubs: SubsidiaryDtoResponse[];
    roles: RolesDtoResponse[]
}

export interface SubsidiaryDtoResponse{
    subsidiaryId?: number;
    subsidiaryName?: string;
    status?: boolean;
    areas: AreaDtoResponse[];
}

export interface AreaDtoResponse {
    areaId?: number;
    areaName?: string;
    areaSubsidiaryId?: number;
    status?: boolean;
    permissionId?: number;
}

export interface RolesDtoResponse {
    roleId?: number;
    roleShortName?: string;
    roleDescription?: string;
    status?: boolean;
}


// users by search BAR

export interface UserSearcherDto {
    id?: number;
    fullName?: string;
    userName?: string;
    email?: string;
    imagePath?: string;
}
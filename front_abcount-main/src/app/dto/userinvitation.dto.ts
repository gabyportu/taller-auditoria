export interface EmployeeDto {
    employeeId: number;
    name: string;
    email: string;
    urlProfilePicture: string | null;
}
export interface InvitedDto {
    invitationId: number;
    invited: string;
    invitedId: number;
    email: string;
    urlProfilePicture: string | null;
}

export interface EmployeeAndInvitationDto{
    employee: EmployeeDto[];
    invitation: InvitedDto[]
}

export interface UserInvitationDto{
    PENDING: InvitationStateDto[];
    REFUSED: InvitationStateDto[];
}

export interface InvitationStateDto{
    invitationId: number;
    username: string;
    companyName: string;
    invitationStatus: string;
    status: boolean;
    accessPersonId: number;
    companyId: number;
    urlImage?: string | null; 
}
export interface User {
  id: string;
  username: string;
}

export interface UserRequestModel {}

export interface UserResponseModel extends User {}

export interface CheckGuestRequestModel extends User {}

export interface CheckGuestResponseModel extends User {}

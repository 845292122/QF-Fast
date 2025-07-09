declare namespace AccountType {
  type Info = {
    id?: number
    phone?: string
    contact?: string
    shopName?: string
    creditCode?: string
    address?: string
    domain?: string
    birthday?: Date
    avatar?: string
    type?: number
    email?: string
    status?: number
    loginIP?: string
    loginDate?: Date
    remark?: string
    isPremium?: number
    startDate?: Date
    endDate?: Date
  }

  type Search = {
    contact?: string
    shopName?: string
    status?: number
    isPremium?: number
  }
}

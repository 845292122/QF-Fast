import service from '.'

const baseURL = '/account'

export const AccountApi = {
  create: (data: AccountType.Info) => service.post(`${baseURL}/create`, data),
  update: (data: AccountType.Info) => service.post(`${baseURL}/update`, data),
  remove: (id: number) => service.post(`${baseURL}/remove/${id}`),
  page: (params: CommonType.Page.Param & AccountType.Search) =>
    service.get<CommonType.Page.Result<AccountType.Info>>(`${baseURL}/page`, { params }),
  info: (id: number) => service.get<AccountType.Info>(`${baseURL}/${id}`)
}

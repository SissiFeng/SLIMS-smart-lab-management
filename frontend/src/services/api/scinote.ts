import request from './request';

export const sciNoteApi = {
  syncChemical: (data: any) => 
    request({
      url: '/scinote/sync/chemical',
      method: 'POST',
      data,
    }),
    
  syncExperiment: (data: any) => 
    request({
      url: '/scinote/sync/experiment',
      method: 'POST',
      data,
    }),
}; 
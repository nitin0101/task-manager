import { SearchPipe } from './search.pipe';

describe('SearchPipe', () => {
  let pipe: SearchPipe;

  beforeEach(() => {
    pipe = new SearchPipe();
  });

  it('create an instance', () => {
    const pipe = new SearchPipe();
    expect(pipe).toBeTruthy();
  });

  it('should return filtered tasks for specific search text', () => {
    const items = [{ title: 'my task' }, { title: 'complete assignemnet' }];
    expect(pipe.transform(items, 'task')).toEqual([{ title: 'my task' }])
  });

  it('should return filtered tasks for specific search text', () => {
    const items = [{ title: 'my task' }, { title: 'complete assignemnet' }];
    expect(pipe.transform(items, '')).toEqual(items)
  });
});

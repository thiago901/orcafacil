import { WatchedList } from '@core/common/entities/watched-list';
import { EstimateItem } from './estimate-item';

export class WatchedEstimateItem extends WatchedList<EstimateItem> {
  compareItems(a: EstimateItem, b: EstimateItem): boolean {
    return a.id.equals(b.id);
  }
}

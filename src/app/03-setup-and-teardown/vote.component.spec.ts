import { VoteComponent } from './vote.component';

describe('VoteComponent', () => {
  // Arrange
  let component: VoteComponent;
  beforeEach(() => {
    component = new VoteComponent();
  });
  it('should increment votes when upvoted', () => {
    // Act
    component.upVote();
    // Assert
    expect(component.totalVotes).toBe(1);
  });
  it('should decrement votes when downvoted', () => {
    // Act
    component.downVote();
    // Assert
    expect(component.totalVotes).toBe(-1);
  });
});
